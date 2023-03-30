import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../../contexts';
import { formatDateDetail } from '../../../../helpers';
import {
  AbstractBlockProps,
  BaseBackgroundColor,
  ExtendedAdviceData,
  ProductType,
  WithClassNameComponentProps,
} from '../../../../interfaces';
import { Image } from '../../image/image';
import { StyledLink } from '../../styled-link/styled-link';
import { Tag, TagSize } from '../../tag/tag';
import { TagsAndButtons } from '../../tags-and-buttons/tags-and-buttons';
import { Tiles, TilingModes } from '../../tiles/tiles';
import adviceStyles from './style.module.scss';

const adviceClassname = 'advice';

export enum AdviceTitleSize {
  large = 'large',
  medium = 'medium',
}

export interface AdviceProps extends AbstractBlockProps {
  item: ExtendedAdviceData;
  titleSize?: AdviceTitleSize;
}

const Advice: FC<AdviceProps & WithClassNameComponentProps> = ({
  className,
  item: {
    photo: advicePhoto,
    date: adviceDate,
    productType: adviceProductType = ProductType.default,
    tag: adviceTag,
    title: adviceTitle,
    url: adviceUrl,
  },
  titleSize = AdviceTitleSize.medium,
}) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const { baseBackgroundColor } = useBaseBackgroundColor();
  if (baseBackgroundColor === BaseBackgroundColor.deepBlue) {
    adviceProductType = ProductType.business;
  }
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);

  return (
    <div
      className={cs(
        adviceStyles[`${adviceClassname}`],
        adviceStyles[`${adviceClassname}_product-type_${adviceProductType}`],
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <div className={adviceStyles[`${adviceClassname}__image-wrapper`]}>
        <Tiles
          animated={true}
          animationReversed={true}
          className={adviceStyles[`${adviceClassname}__tiles`]}
          hovered={areTilesAnimated}
          tilingMode={TilingModes.solidCorners}
        />
        <Image className={adviceStyles[`${adviceClassname}__image`]} image={advicePhoto} />
      </div>
      <div
        className={cs(
          adviceStyles[`${adviceClassname}__link-wrapper`],
          adviceStyles[`${adviceClassname}__link-wrapper_${titleSize}`],
        )}
      >
        <StyledLink
          className={cs(adviceStyles[`${adviceClassname}__link`])}
          dangerouslySetInnerHTML={{ __html: adviceTitle }}
          to={adviceUrl}
        />
      </div>
      <TagsAndButtons className={adviceStyles[`${adviceClassname}__tags`]}>
        <Tag size={TagSize.small} title={adviceTag.value} />
        <Tag size={TagSize.small} title={formatDateDetail(adviceDate, language, t)} />
      </TagsAndButtons>
    </div>
  );
};

export { Advice };
