import cs from 'classnames';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { buildFilterItemIdToFilterItemMap } from '../../../../../helpers';
import { Country, FilterData, PointOfServiceAddress } from '../../../../../interfaces';
import { Addresses } from '../../../../units/addresses/addresses';
import { Filters } from '../../../../units/filters/filters';
import { pointsOfServiceBlockClassname } from '../../constants';
import { PointsOfServiceBlockProps } from '../../interfaces';
import pointsOfServiceBlockStyles from '../../style.module.scss';
import { Search } from '../search/search';
import { ModeSwitcher, PointsOfServiceBlockMode, PointsOfServiceMap } from './../../components';

type PointsOfServiceFullBlockProps = Omit<PointsOfServiceBlockProps, 'isCompact' | 'posType' | 'withCategoryFilter'> & {
  pointsOfService: PointOfServiceAddress[];
};

const PointsOfServiceFullBlock: FC<PointsOfServiceFullBlockProps> = ({
  className,
  countries,
  mapClassname,
  pointsOfService,
}) => {
  const [chosenMode, setChosenMode] = useState<PointsOfServiceBlockMode>(PointsOfServiceBlockMode.map);

  const [chosenCountryId, setChosenCountryId] = useState<number | null>(null);

  const countryIdToCountryMap: Map<number, Country> = useMemo(() => {
    return buildFilterItemIdToFilterItemMap(countries);
  }, [countries]);

  const countriesForFilter = useMemo(() => [...countryIdToCountryMap.values()], [countryIdToCountryMap]);

  const chosenCountry = useMemo(() => {
    if (chosenCountryId) {
      return countryIdToCountryMap.get(chosenCountryId)!;
    }

    return null;
  }, [chosenCountryId, countryIdToCountryMap]);

  const regionsForFilters = useMemo(() => {
    if (!chosenCountry) {
      return [];
    }

    return chosenCountry.regions;
  }, [chosenCountry]);

  const [chosenRegionId, setChosenRegionId] = useState<number | null>(null);

  const countryPointsOfService = useMemo(
    () => pointsOfService.filter(({ countryId }) => countryId === chosenCountryId),
    [chosenCountryId, pointsOfService],
  );

  const countryRegionIdToPointsOfService: Map<number, PointOfServiceAddress[]> = useMemo(() => {
    return countryPointsOfService.reduce((result, point) => {
      if (!result.has(point.regionId)) {
        result.set(point.regionId, []);
      }

      result.get(point.regionId)!.push(point);

      return result;
    }, new Map<number, PointOfServiceAddress[]>());
  }, [countryPointsOfService]);

  const geoFilters = useMemo(() => {
    const result: FilterData[] = [
      {
        defaultItemId: countriesForFilter[0].id,
        code: 'country',
        items: countriesForFilter,
        isShowsMultipleValue: true,
      },
    ];

    if (chosenCountry) {
      result.push({
        defaultItemId: chosenCountry.regions[0].id,
        code: 'region',
        items: regionsForFilters,
      });
    }

    return result;
  }, [chosenCountry, countriesForFilter, regionsForFilters]);

  const filteredByRegionPointsOfService: PointOfServiceAddress[] = useMemo(() => {
    if (!chosenRegionId) {
      return pointsOfService;
    }

    return (
      countryRegionIdToPointsOfService.get(chosenRegionId)?.filter(({ regionId }) => regionId === chosenRegionId) ?? []
    );
  }, [chosenRegionId, countryRegionIdToPointsOfService, pointsOfService]);

  const [filteredPointsOfService, setFilteredPointsOfService] = useState<PointOfServiceAddress[]>([]);

  useEffect(() => {
    setFilteredPointsOfService(filteredByRegionPointsOfService);
  }, [chosenMode, filteredByRegionPointsOfService]);

  return (
    <>
      <div
        className={cs(
          pointsOfServiceBlockStyles[pointsOfServiceBlockClassname],
          pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}_mode-and-filters-wrapper`],
          className,
        )}
      >
        <ModeSwitcher currentMode={chosenMode} onChange={setChosenMode} />
        <Filters
          filters={geoFilters}
          onChange={({ code, id }) => {
            if (!id) {
              return;
            }

            switch (code) {
              case 'country':
                setChosenCountryId(id);
                break;
              case 'region':
                setChosenRegionId(id);
                break;
            }
          }}
        />
      </div>
      {chosenMode === PointsOfServiceBlockMode.map ? (
        <PointsOfServiceMap
          className={pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}_map-wrapper`]}
          mapClassname={mapClassname}
          points={filteredByRegionPointsOfService}
        />
      ) : null}
      {chosenMode === PointsOfServiceBlockMode.list ? (
        <>
          <Search
            className={pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}__list-search`]}
            onFilter={setFilteredPointsOfService}
            points={filteredByRegionPointsOfService}
            showResults={false}
          />
          <Addresses
            className={pointsOfServiceBlockStyles[`${pointsOfServiceBlockClassname}_list-wrapper`]}
            items={filteredPointsOfService}
          />
        </>
      ) : null}
    </>
  );
};

export { PointsOfServiceFullBlock };
