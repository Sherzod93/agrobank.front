import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useBaseBackgroundColor } from '../../../contexts';
import { formatString } from '../../../helpers';
import {
  AbstractBlockProps,
  BlockWithItemsComponentProps,
  SocialNetwork,
  SocialNetworkLink,
} from '../../../interfaces';
import { SocialNetworks } from '../../units/social-networks/social-networks';
import shareBlockStyles from './style.module.scss';

const shareBlockClassname = 'share-block';

export interface ShareBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<SocialNetworkLink> {
  entityType?: string;
}

const ShareBlock: FC<ShareBlockProps> = ({ className, entityType = 'default', items }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const { t } = useTranslation();
  const shareLinks = useMemo(
    () =>
      [
        ...items,
        {
          title: '',
          url: '',
          type: SocialNetwork.share,
        },
      ].map(({ title, type, url }) => {
        return {
          title: title || t(`block-share.link-title_${type}`),
          type,
          url: formatString(url, String(window.location)),
        } as SocialNetworkLink;
      }),
    [items, t],
  );

  return (
    <div
      className={cs(
        shareBlockStyles[shareBlockClassname],
        shareBlockStyles[`${shareBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <div
        className={shareBlockStyles[`${shareBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: t(`block-share.title_${entityType || 'default'}`) }}
      />
      <SocialNetworks
        className={shareBlockStyles[`${shareBlockClassname}__share-links`]}
        socialNetworkLinks={shareLinks}
      />
    </div>
  );
};

export { ShareBlock };
