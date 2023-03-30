import cs from 'classnames';
import React, { FC, useState } from 'react';
import {
  AbstractBlockProps,
  BlockWithProductTypeComponentProps,
  BlockWithTitleComponentProps,
  PhoneInfo,
  ProductType,
} from '../../../interfaces';
import { Icon, IconCode } from '../../units/icon/icon';
import { StyledLink } from '../../units/styled-link/styled-link';
import { Tiles } from '../../units/tiles/tiles';
import callCenterBlockStyles from './style.module.scss';

const callCenterBlockClassname = 'call-center-block';

export interface CallCenterBlockProps
  extends AbstractBlockProps,
    Partial<BlockWithProductTypeComponentProps>,
    BlockWithTitleComponentProps {
  phone: PhoneInfo;
  text: string;
}

const CallCenterBlock: FC<CallCenterBlockProps> = ({
  className,
  phone,
  productType = ProductType.default,
  text,
  title,
}) => {
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const { phoneIcon } = IconCode;
  const { hint: phoneHint, phoneNumber } = phone;

  return (
    <div
      className={cs(
        callCenterBlockStyles[callCenterBlockClassname],
        callCenterBlockStyles[`${callCenterBlockClassname}_product-type_${productType}`],
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <Tiles
        animated={areTilesAnimated}
        className={callCenterBlockStyles[`${callCenterBlockClassname}__tiles`]}
        productType={productType}
      />
      <div
        className={callCenterBlockStyles[`${callCenterBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className={cs(callCenterBlockStyles[`${callCenterBlockClassname}__phone-wrapper`], {
          [callCenterBlockStyles[`${callCenterBlockClassname}__phone-wrapper_long`]]: phoneNumber.length > 5,
        })}
      >
        <Icon className={callCenterBlockStyles[`${callCenterBlockClassname}__icon`]} code={phoneIcon} />
        <StyledLink
          className={callCenterBlockStyles[`${callCenterBlockClassname}__phone`]}
          dangerouslySetInnerHTML={{ __html: phoneHint }}
          to={`tel:${phoneNumber}`}
        />
      </div>
      <div
        className={callCenterBlockStyles[`${callCenterBlockClassname}__text`]}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export { CallCenterBlock };
