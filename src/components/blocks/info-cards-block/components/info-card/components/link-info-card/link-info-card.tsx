import cs from 'classnames';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Breakpoints, breakpointsToMediaQuery } from '../../../../../../../helpers';
import { useMatchMedia } from '../../../../../../../hooks';
import { WithClassNameComponentProps } from '../../../../../../../interfaces';
import { Button } from '../../../../../../units/controls/button/button';
import { Link } from '../../../../../../units/link/link';
import { TagsAndButtons } from '../../../../../../units/tags-and-buttons/tags-and-buttons';
import { LinkInfoCardData } from '../../../../interfaces';
import linkInfoCardStyles from './style.module.scss';

const linkInfoCardClassname = 'link-info-card';

interface LinkInfoCardProps {
  infoCardData: LinkInfoCardData;
}

const LinkInfoCard: FC<LinkInfoCardProps & WithClassNameComponentProps> = ({
  className,
  infoCardData: { text, url },
}) => {
  const {
    i18n: { t },
  } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  return (
    <div
      className={cs(
        linkInfoCardStyles[linkInfoCardClassname],
        {
          [linkInfoCardStyles[`${linkInfoCardClassname}_is-mobile`]]: isMobile,
        },
        className,
      )}
    >
      {!isMobile ? (
        <Link
          className={cs(
            linkInfoCardStyles[`${linkInfoCardClassname}__link`],
            linkInfoCardStyles[`${linkInfoCardClassname}__text`],
          )}
          dangerouslySetInnerHTML={{ __html: text }}
          to={url}
        />
      ) : (
        <>
          <div
            className={linkInfoCardStyles[`${linkInfoCardClassname}__text`]}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <Link className={linkInfoCardStyles[`${linkInfoCardClassname}__link`]} to={url}>
            <TagsAndButtons>
              <Button className={linkInfoCardStyles[`${linkInfoCardClassname}__button`]} type="button">
                <span dangerouslySetInnerHTML={{ __html: t('block-info-card.read-more') }} />
              </Button>
            </TagsAndButtons>
          </Link>
        </>
      )}
    </div>
  );
};

export { LinkInfoCard };
