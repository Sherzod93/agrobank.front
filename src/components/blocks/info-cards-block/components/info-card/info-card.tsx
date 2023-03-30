import cs from 'classnames';
import React, { FC, useMemo, useState } from 'react';
import { BaseBackgroundColorContext } from '../../../../../contexts';
import { Breakpoints, breakpointsToMediaQuery, getProductTypeBaseBackgroundColor } from '../../../../../helpers';
import { useMatchMedia } from '../../../../../hooks';
import { BaseBackgroundColor, WithClassNameComponentProps } from '../../../../../interfaces';
import { Icon, IconCode } from '../../../../units/icon/icon';
import { TilePatternSize, Tiles, TilingModes } from '../../../../units/tiles/tiles';
import { InfoCardData, InfoCardType } from '../../interfaces';
import { infoCardTypeToComponentMap } from './components';

import infoCardBlockStyles from './style.module.scss';

const infoCardClassname = 'info-card';

interface InfoCardProps {
  infoCardData: InfoCardData;
  isStandalone?: boolean;
}

const InfoCard: FC<InfoCardProps & WithClassNameComponentProps> = ({
  className,
  infoCardData,
  isStandalone = false,
}) => {
  const { isFoldable, productType, title, type } = infoCardData;
  const baseBackgroundColor = getProductTypeBaseBackgroundColor(productType);
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const [isFolded, setIsFolded] = useState(isFoldable);
  const [isMobile, setIsMobile] = useState(true);
  const CardComponent = isStandalone ? 'div' : 'li';
  const ContentComponent: FC<InfoCardProps & WithClassNameComponentProps> = infoCardTypeToComponentMap[type] as any;
  const isTelegramLink = infoCardData.type === InfoCardType.link ? infoCardData.isTelegramLink ?? false : false;

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  const baseBackgroundColorContextValue = useMemo(() => {
    return { baseBackgroundColor };
  }, [baseBackgroundColor]);

  if (!ContentComponent) {
    console.warn(`Unknown info card type: '${type}'`);

    return null;
  }

  const isActuallyFoldable = isMobile && isFoldable;

  return (
    <BaseBackgroundColorContext.Provider value={baseBackgroundColorContextValue}>
      <CardComponent
        className={cs(
          infoCardBlockStyles[infoCardClassname],
          isTelegramLink
            ? [
                infoCardBlockStyles[`${infoCardClassname}_base-background-color_${BaseBackgroundColor.blue}`],
                infoCardBlockStyles[`${infoCardClassname}_is-telegram-link`],
              ]
            : infoCardBlockStyles[`${infoCardClassname}_base-background-color_${baseBackgroundColor}`],
          {
            [infoCardBlockStyles[`${infoCardClassname}_folded`]]: isActuallyFoldable && isFolded,
          },
          className,
        )}
        onMouseEnter={() => setAreTilesAnimated(true)}
        onMouseLeave={() => setAreTilesAnimated(false)}
      >
        {(isActuallyFoldable && !isFolded) || !isActuallyFoldable ? (
          <Tiles
            animated={areTilesAnimated}
            className={cs(infoCardBlockStyles[`${infoCardClassname}__tiles`], {
              [infoCardBlockStyles[`${infoCardClassname}__tiles_hover`]]: areTilesAnimated,
            })}
            hovered={areTilesAnimated}
            tilePatternSize={TilePatternSize.small}
            tilingMode={TilingModes.rightBottomCorner}
          />
        ) : null}
        <button
          aria-expanded={isFoldable ? !isFolded : undefined}
          className={infoCardBlockStyles[`${infoCardClassname}__title-wrapper`]}
          disabled={!isActuallyFoldable}
          onClick={() => setIsFolded(!isFolded)}
        >
          <div
            className={infoCardBlockStyles[`${infoCardClassname}__title`]}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {isActuallyFoldable ? (
            <Icon className={infoCardBlockStyles[`${infoCardClassname}__expand-icon`]} code={IconCode.expandArrow} />
          ) : null}
        </button>
        <ContentComponent
          className={infoCardBlockStyles[`${infoCardClassname}__content`]}
          infoCardData={infoCardData}
        />
      </CardComponent>
    </BaseBackgroundColorContext.Provider>
  );
};

export { InfoCard };
