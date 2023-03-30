import cs from 'classnames';
import React, { FC } from 'react';
import { ComponentRenderType, ProductAdvantageData, WithClassNameComponentProps } from '../../../../../interfaces';
import iconsSvgPath from './icons.svg';
import advantageStyles from './style.module.scss';

const advantageClassname = 'product-advantage';

export enum DescriptionSize {
  big = 'big',
  default = 'default',
}

export interface ProductAdvantageProps {
  descriptionSize?: DescriptionSize;
  productAdvantage: ProductAdvantageData;
  renderType?: ComponentRenderType;
}

const ProductAdvantage: FC<ProductAdvantageProps & WithClassNameComponentProps> = ({
  className,
  descriptionSize = DescriptionSize.default,
  productAdvantage: {
    description: productAdvantageDescription,
    title: productAdvantageTitle,
    type: productAdvantageType,
  },
  renderType = ComponentRenderType.default,
}) => {
  const TagName = renderType === ComponentRenderType.listItem ? 'li' : 'div';

  return (
    <TagName
      className={cs(
        advantageStyles[advantageClassname],
        advantageStyles[`${advantageClassname}_description-size_${descriptionSize}`],
        className,
      )}
    >
      <svg className={advantageStyles[`${advantageClassname}__icon`]} height="270" viewBox="0 0 270 270" width="270">
        <use href={`${iconsSvgPath}#advantage-icon-diamond-border`} />
        <use href={`${iconsSvgPath}#advantage-icon-${productAdvantageType}`} />
      </svg>
      <div
        className={advantageStyles[`${advantageClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: productAdvantageTitle }}
      />
      <div
        className={advantageStyles[`${advantageClassname}__description`]}
        dangerouslySetInnerHTML={{ __html: productAdvantageDescription }}
      />
    </TagName>
  );
};

export { ProductAdvantage };
