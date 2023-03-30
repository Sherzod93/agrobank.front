import cs from 'classnames';
import React, { FC, useRef, useState } from 'react';
import { useTextAutoresize } from '../../../hooks';
import {
  AbstractBlockProps,
  BlockWithProductTypeComponentProps,
  BlockWithTitleComponentProps,
  EmailInfo,
  PhoneInfo,
  ProductType,
} from '../../../interfaces';
import { StyledLink } from '../../units/styled-link/styled-link';
import { Tiles } from '../../units/tiles/tiles';
import contactsBlockStyles from './style.module.scss';

const contactsBlockClassname = 'contacts-block';

export interface ContactsBlockProps
  extends AbstractBlockProps,
    Partial<BlockWithProductTypeComponentProps>,
    BlockWithTitleComponentProps {
  email: EmailInfo;
  phone: PhoneInfo;
}

const ContactsBlock: FC<ContactsBlockProps> = ({
  className,
  email,
  phone,
  productType = ProductType.default,
  title,
}) => {
  const [areTilesAnimated, setAreTilesAnimated] = useState(false);
  const phoneLinkElementRef = useRef<HTMLDivElement>(null);
  const emailLinkElementRef = useRef<HTMLDivElement>(null);
  const { address: emailAddress, title: emailTitle } = email;
  const { hint: phoneHint, phoneNumber, title: phoneTitle } = phone;

  useTextAutoresize(emailLinkElementRef);
  useTextAutoresize(phoneLinkElementRef);

  return (
    <div
      className={cs(
        contactsBlockStyles[contactsBlockClassname],
        contactsBlockStyles[`${contactsBlockClassname}_product-type_${productType}`],
        className,
      )}
      onMouseEnter={() => setAreTilesAnimated(true)}
      onMouseLeave={() => setAreTilesAnimated(false)}
    >
      <Tiles
        animated={areTilesAnimated}
        className={contactsBlockStyles[`${contactsBlockClassname}__tiles`]}
        productType={productType}
      />
      <div
        className={contactsBlockStyles[`${contactsBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {phone && (
        <div className={contactsBlockStyles[`${contactsBlockClassname}__phone-and-title-wrapper`]}>
          <div ref={phoneLinkElementRef} className={contactsBlockStyles[`${contactsBlockClassname}__phone-wrapper`]}>
            <StyledLink className={contactsBlockStyles[`${contactsBlockClassname}__link`]} to={`tel:${phoneNumber}`}>
              <span
                className={contactsBlockStyles[`${contactsBlockClassname}__phone`]}
                dangerouslySetInnerHTML={{ __html: phoneHint }}
              />
            </StyledLink>
          </div>
          {phone.title && (
            <div
              className={contactsBlockStyles[`${contactsBlockClassname}__phone-title`]}
              dangerouslySetInnerHTML={{ __html: phoneTitle! }}
            />
          )}
        </div>
      )}
      {email && (
        <div className={contactsBlockStyles[`${contactsBlockClassname}__email-and-title-wrapper`]}>
          <div ref={emailLinkElementRef} className={contactsBlockStyles[`${contactsBlockClassname}__email-wrapper`]}>
            <StyledLink
              className={contactsBlockStyles[`${contactsBlockClassname}__link`]}
              to={`mailto:${emailAddress}`}
            >
              <span
                className={contactsBlockStyles[`${contactsBlockClassname}__email`]}
                dangerouslySetInnerHTML={{ __html: emailAddress }}
              />
            </StyledLink>
          </div>
          {emailTitle && (
            <div
              className={contactsBlockStyles[`${contactsBlockClassname}__email-title`]}
              dangerouslySetInnerHTML={{ __html: emailTitle! }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export { ContactsBlock };
