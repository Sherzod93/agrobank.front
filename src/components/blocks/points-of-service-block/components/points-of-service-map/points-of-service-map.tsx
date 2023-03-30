import cs from 'classnames';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Map as MapComponent, MapState } from 'react-yandex-maps';
import { GeoObjectCollection, IEvent, Map as MapClass, Placemark } from 'yandex-maps';
import { PointOfServiceAddress, WithClassNameComponentProps } from '../../../../../interfaces';
import { PointsOfServiceFetchState, SettingsFetchState } from '../../../../../services/reducers';
import { useAppSelector } from '../../../../../services/store';
import { MapControls, MapControlType } from '../map-controls/map-controls';
import { Search } from '../search/search';
import { PointOfServiceInformation } from './components';
import pointsOfServiceMapStyles from './style.module.scss';

const pointsOfServiceMapClassname = 'points-of-service-map';

const pointToPlacemarkMap = new Map<PointOfServiceAddress, Placemark>();

const placemarkStateToZIndexPlacemarkOptions = {
  default: {
    zIndex: 10000,
    zIndexHover: 10211,
  },
  selected: {
    zIndex: 10200,
    zIndexHover: 10210,
  },
};

interface MapProps {
  mapClassname?: string;
  points: PointOfServiceAddress[];
}

const PointsOfServiceMap: FC<MapProps & WithClassNameComponentProps> = ({ className, mapClassname, points }) => {
  const [yMaps, setYMaps] = useState<any>(null);

  const pinOptions = useMemo(() => {
    if (!yMaps) {
      return null;
    }

    const sizes = {
      default: 70,
      selected: 160,
    };

    return {
      layouts: {
        default: yMaps.templateLayoutFactory
          .createClass(`<div class="placemark-content-layout{% if properties.selected %} placemark-content-layout_selected{% endif %}{% if properties.hovered %} placemark-content-layout_hovered{% endif %}">
  <svg class="placemark-content-layout__icon" width="71" height="71" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="placemark-content-layout__icon-background" d="M0 35.3555L35.3553 0.000130633L70.7107 35.3555L35.3553 70.7108L0 35.3555Z"/>
    <path class="placemark-content-layout__icon-letter" d="M26.9906 24V27.5657H31.2352L24 46H29.2817L30.8895 41.4671H39.9255L41.5334 46H47L38.3981 24H26.9906ZM32.3687 37.4557L35.3834 29.0459L38.4624 37.4557H32.3687Z"/>
  </svg>
</div>`),
      },
      shapes: ['default' as const, 'selected' as const].reduce((result, type) => {
        const size = sizes[type];

        result[type] = {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [(-1 * size) / 2, (-1 * size) / 2],
              [0, -1 * size],
              [size / 2, (-1 * size) / 2],
            ],
          ],
        };

        return result;
      }, {} as any),
    };
  }, [yMaps]);

  const [mapInstance, setMapInstance] = useState<MapClass | null>(null);

  const mapGeoObjectCollectionRef = useRef<GeoObjectCollection | null>(null);

  useEffect(() => {
    if (!yMaps || !mapInstance) {
      return;
    }

    mapGeoObjectCollectionRef.current = new yMaps.GeoObjectCollection();

    const { current: geoObjectCollection } = mapGeoObjectCollectionRef;

    if (geoObjectCollection) {
      mapInstance.geoObjects.add(geoObjectCollection);

      return () => {
        mapInstance.geoObjects.remove(geoObjectCollection);
      };
    }
  }, [mapInstance, yMaps]);

  const { pointsOfService, requestPhase: pointsOfServiceRequestState } = useAppSelector(
    (state) => state.pointsOfService,
  );

  const [selectedPoint, setSelectedPoint] = useState<PointOfServiceAddress | null>(null);

  const [isSelectedPointInfoShowed, setIsSelectedPointInfoShowed] = useState<boolean>(false);

  const selectPoint = useCallback((point: PointOfServiceAddress) => {
    setSelectedPoint(point);
    setIsSelectedPointInfoShowed(true);
  }, []);

  const placemarkClickHandler = useCallback(
    (event: IEvent) => {
      const placemark = event.get('target') as Placemark;
      const point = placemark.properties.get('point', null as any) as PointOfServiceAddress;

      if (point) {
        selectPoint(point);
      }
    },
    [selectPoint],
  );

  const placemarkMouseenterHandler = useCallback((event: IEvent) => {
    (event.get('target') as Placemark)!.properties.set('hovered', true as any);
  }, []);

  const placemarkMouseleaveHandler = useCallback((event: IEvent) => {
    (event.get('target') as Placemark)!.properties.set('hovered', false as any);
  }, []);

  const buildPlacemark = useCallback(
    (point: PointOfServiceAddress, selected: boolean = false) => {
      const { current: mapGeoObjectCollection } = mapGeoObjectCollectionRef;

      if (!yMaps || !mapInstance || !mapGeoObjectCollection || !pinOptions) {
        return null;
      }

      const placemark = new yMaps.Placemark(
        point.coords,
        { point, selected },
        {
          iconLayout: pinOptions.layouts.default,
          iconShape: pinOptions.shapes[selected ? 'selected' : 'default'],
          ...placemarkStateToZIndexPlacemarkOptions[selected ? 'selected' : 'default'],
        },
      );

      placemark.events.add('click', placemarkClickHandler);
      placemark.events.add('mouseenter', placemarkMouseenterHandler);
      placemark.events.add('mouseleave', placemarkMouseleaveHandler);

      const oldPlacemark = pointToPlacemarkMap.get(point);

      pointToPlacemarkMap.set(point, placemark);

      return [placemark, oldPlacemark];
    },
    [mapInstance, pinOptions, placemarkClickHandler, placemarkMouseenterHandler, placemarkMouseleaveHandler, yMaps],
  );

  useEffect(() => {
    if (!mapInstance || !pinOptions || !mapGeoObjectCollectionRef.current) {
      return;
    }

    if (selectedPoint) {
      const placemark = pointToPlacemarkMap.get(selectedPoint)!;

      if (!placemark) {
        return;
      }

      const pair = buildPlacemark(selectedPoint, true);

      if (pair) {
        const [placemark, oldPlacemark] = pair;

        mapInstance.setCenter(selectedPoint.coords, undefined, { duration: 100 }).catch(console.warn);
        mapGeoObjectCollectionRef.current.add(placemark);
        mapGeoObjectCollectionRef.current.remove(oldPlacemark);

        return () => {
          if (!mapGeoObjectCollectionRef.current) {
            return;
          }

          const [placemark, oldPlacemark] = buildPlacemark(selectedPoint, false) as [Placemark, Placemark];

          mapGeoObjectCollectionRef.current.add(placemark);
          mapGeoObjectCollectionRef.current.remove(oldPlacemark);
        };
      }
    }
  }, [buildPlacemark, mapInstance, pinOptions, selectedPoint]);

  useEffect(() => {
    if (pointsOfServiceRequestState !== PointsOfServiceFetchState.fulfilled || !yMaps || !pinOptions) {
      return;
    }

    pointsOfService.forEach((point) => {
      buildPlacemark(point, false);
    });

    return () => {
      pointToPlacemarkMap.clear();
    };
  }, [buildPlacemark, pinOptions, pointsOfService, pointsOfServiceRequestState, yMaps]);

  const { settings, requestPhase: settingsRequestState } = useAppSelector((state) => state.settings);

  const mapModulesToLoad = useMemo(() => {
    if (settingsRequestState !== SettingsFetchState.fulfilled) {
      return [];
    }

    const result = ['GeoObjectCollection', 'Placemark', 'templateLayoutFactory'];

    if (settings?.map.isGeolocationAllowed) {
      result.push('geolocation');
    }

    return result;
  }, [settings, settingsRequestState]);

  const mapDefaultState: MapState | null = useMemo(() => {
    if (settingsRequestState !== SettingsFetchState.fulfilled) {
      return null;
    }

    return {
      center: settings!.map.center,
      suppressMapOpenBlock: true,
      zoom: 9,
    } as MapState;
  }, [settings, settingsRequestState]);

  useEffect(() => {
    if (!mapInstance) {
      return;
    }

    const { current: geoObjectCollection } = mapGeoObjectCollectionRef;

    if (geoObjectCollection) {
      points.forEach((point) => {
        geoObjectCollection.add(pointToPlacemarkMap.get(point)!);
      });

      const mapGeoObjectCollectionBounds = geoObjectCollection.getBounds();

      if (mapGeoObjectCollectionBounds) {
        mapInstance.setBounds(mapGeoObjectCollectionBounds).catch(console.warn);
      }

      setSelectedPoint(null);

      return () => {
        geoObjectCollection.removeAll();
      };
    }
  }, [mapInstance, points]);

  const geolocationObjectsRef = useRef<GeoObjectCollection | null>(null);
  const searchInputElementRef = useRef<HTMLInputElement>(null);

  const handleMapControlClick = useCallback(
    (controlType: MapControlType) => {
      if (!yMaps || !mapInstance) {
        return;
      }

      switch (controlType) {
        case MapControlType.geolocation:
          if (geolocationObjectsRef.current) {
            geolocationObjectsRef.current.removeAll();
            geolocationObjectsRef.current = null;
          }

          yMaps.geolocation
            .get({
              provider: 'yandex',
              mapStateAutoApply: true,
            })
            .then(({ geoObjects }: any) => {
              geolocationObjectsRef.current = geoObjects;
              mapInstance.geoObjects.add(geoObjects);
            })
            .catch(console.warn);
          break;
        case MapControlType.zoomIn:
          mapInstance.setZoom(mapInstance.getZoom() + 1).catch(console.warn);
          break;
        case MapControlType.zoomOut:
          mapInstance.setZoom(mapInstance.getZoom() - 1).catch(console.warn);
          break;
      }
    },
    [mapInstance, yMaps],
  );

  const onFilter = useCallback((points: PointOfServiceAddress[]) => {
    const { current: geoObjectCollection } = mapGeoObjectCollectionRef;

    if (!geoObjectCollection) {
      return;
    }

    const [filteredPlacemarks] = [...pointToPlacemarkMap.entries()].reduce(
      (result, [point, palcemark]) => {
        result[points.includes(point) ? 0 : 1].push(palcemark);

        return result;
      },
      [[], []] as [Placemark[], Placemark[]],
    );

    geoObjectCollection.removeAll();

    filteredPlacemarks.forEach((placemark) => geoObjectCollection.add(placemark));
  }, []);

  if (
    !mapDefaultState ||
    pointsOfServiceRequestState !== PointsOfServiceFetchState.fulfilled ||
    settingsRequestState !== SettingsFetchState.fulfilled
  ) {
    return null;
  }

  return (
    <div className={cs(pointsOfServiceMapStyles[pointsOfServiceMapClassname], className)}>
      {yMaps ? (
        <div
          className={cs(pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__map-controls-wrapper`], 'container')}
        >
          <MapControls
            className={pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__controls`]}
            isGeolocationAllowed={settings?.map?.isGeolocationAllowed ?? false}
            onClick={handleMapControlClick}
          />
          <Search
            ref={searchInputElementRef}
            className={pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__search`]}
            onFilter={onFilter}
            onFocus={() => {
              setIsSelectedPointInfoShowed(false);
            }}
            onPointSelected={selectPoint}
            points={points}
            showResults={!isSelectedPointInfoShowed}
          />
          {selectedPoint && isSelectedPointInfoShowed ? (
            <PointOfServiceInformation
              className={pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__point-information-wrapper`]}
              point={selectedPoint}
              onClose={() => {
                setIsSelectedPointInfoShowed(false);

                const { current: searchInputElement } = searchInputElementRef;

                if (searchInputElement && searchInputElement.value.length > 0) {
                  searchInputElement.focus();
                }
              }}
            />
          ) : null}
        </div>
      ) : null}
      <div className={cs(pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__map-wrapper`], mapClassname)}>
        <MapComponent
          className={pointsOfServiceMapStyles[`${pointsOfServiceMapClassname}__map`]}
          instanceRef={(mapInstance) => {
            setMapInstance(mapInstance as any);
          }}
          defaultState={mapDefaultState}
          defaultOptions={{
            maxZoom: 15,
            minZoom: 3,
            suppressMapOpenBlock: true,
          }}
          modules={mapModulesToLoad}
          onLoad={setYMaps}
        />
      </div>
    </div>
  );
};

export { PointsOfServiceMap };
