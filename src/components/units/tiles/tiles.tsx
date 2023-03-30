import cs from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';
import { provideForwardRef } from '../../../helpers';
import { useStyleElement } from '../../../hooks';
import { ProductType, WithClassNameComponentProps } from '../../../interfaces';
import { calcTilesCount } from './helpers';
import tilesStyles from './style.module.scss';

const tilesClassname = 'tiles';
const cornerClassname = `${tilesClassname}__corner`;

export enum TilingModes {
  corners = 'corners',
  cornersWithBackground = 'corners-with-background',
  default = 'default',
  leftTopCorner = 'left-top-corner',
  leftBottomCorner = 'left-bottom-corner',
  rightBottomCorner = 'right-bottom-corner',
  rightTopCorner = 'right-top-corner',
  solidCorners = 'solid-corners',
}

enum TilePosition {
  leftBottom = 'left-bottom',
  leftTop = 'left-top',
  rightBottom = 'right-bottom',
  rightTop = 'right-top',
}

export enum TilePatternSize {
  default = 'default',
  small = 'small',
}

interface TilesProps {
  animated?: boolean;
  hovered?: boolean;
  productType?: ProductType;
  animationReversed?: boolean;
  tilePatternSize?: TilePatternSize;
  tilingMode?: TilingModes;
}

const Tiles = React.forwardRef<HTMLDivElement, TilesProps & WithClassNameComponentProps>(
  (
    {
      animated = false,
      className,
      hovered = false,
      productType = ProductType.default,
      animationReversed = false,
      tilePatternSize = TilePatternSize.default,
      tilingMode = TilingModes.default,
    },
    forwardRef,
  ) => {
    const componentElementRef = useRef<HTMLDivElement | null>(null);
    const [styleElementRef, styleElementCssScope] = useStyleElement();

    useEffect(() => {
      const { current: componentElement } = componentElementRef;
      const { current: styleElement } = styleElementRef;

      if (!componentElement || !styleElement) {
        return;
      }

      const { sheet: cssSheet } = styleElement;

      if (!cssSheet) {
        return;
      }

      const resizeObserver = new ResizeObserver(
        ([
          {
            target: { clientHeight: height, clientWidth: width },
          },
        ]) => {
          Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));

          switch (tilingMode) {
            case TilingModes.default: {
              const backgroundSize = 230;
              const count = calcTilesCount(width, backgroundSize);
              const actualBackgroundSize = width / count;

              cssSheet.insertRule(`.${tilesStyles[tilesClassname]}_${styleElementCssScope}::after {
  background-size: ${actualBackgroundSize}px;
}`);
              break;
            }
            case TilingModes.solidCorners: {
              const cornerWidth = Math.min(height, width) / 2;

              cssSheet.insertRule(`.${tilesStyles[tilesClassname]}_${styleElementCssScope} .${tilesStyles[cornerClassname]} {
  height: ${cornerWidth}px !important;
  width: ${cornerWidth}px !important;
}`);

              break;
            }
          }
        },
      );

      resizeObserver.observe(componentElement);

      return () => {
        Array.from(cssSheet.cssRules).forEach(() => cssSheet.removeRule(0));
        resizeObserver.disconnect();
      };
    }, [styleElementCssScope, styleElementRef, tilingMode]);

    const corners: TilePosition[] = useMemo(() => {
      switch (tilingMode) {
        case TilingModes.default:
          return [];
        case TilingModes.corners:
        case TilingModes.cornersWithBackground:
        case TilingModes.solidCorners:
          return [TilePosition.leftTop, TilePosition.rightTop, TilePosition.rightBottom, TilePosition.leftBottom];
        case TilingModes.leftBottomCorner:
          return [TilePosition.leftBottom];
        case TilingModes.leftTopCorner:
          return [TilePosition.leftTop];
        case TilingModes.rightBottomCorner:
          return [TilePosition.rightBottom];
        case TilingModes.rightTopCorner:
          return [TilePosition.rightTop];
      }
    }, [tilingMode]);

    return (
      <div
        ref={(element) => {
          componentElementRef.current = element;
          provideForwardRef(element, forwardRef as React.ForwardedRef<HTMLElement>);
        }}
        className={cs(
          tilesStyles[tilesClassname],
          `${tilesStyles[tilesClassname]}_${styleElementCssScope}`,
          tilesStyles[`${tilesClassname}_tiling-mode_${tilingMode}`],
          tilesStyles[`${tilesClassname}_tile-pattern-size_${tilePatternSize}`],
          tilesStyles[`${tilesClassname}_product-type_${productType}`],
          {
            [tilesStyles[`${tilesClassname}_animated`]]:
              (tilingMode === TilingModes.default && animated) ||
              (tilingMode === TilingModes.cornersWithBackground && animated),
            [tilesStyles[`${tilesClassname}_animation-reversed`]]:
              [TilingModes.corners, TilingModes.cornersWithBackground, TilingModes.solidCorners].includes(tilingMode) &&
              animationReversed,
            [tilesStyles[`${tilesClassname}_hover`]]:
              [
                TilingModes.corners,
                TilingModes.leftBottomCorner,
                TilingModes.leftTopCorner,
                TilingModes.rightBottomCorner,
                TilingModes.rightTopCorner,
                TilingModes.solidCorners,
              ].includes(tilingMode) && hovered,
          },
          className,
        )}
      >
        {corners.map((position) => (
          <div
            key={position}
            className={cs(tilesStyles[cornerClassname], tilesStyles[`${cornerClassname}_${position}`])}
          />
        ))}
      </div>
    );
  },
);

export { Tiles };
