import cs from 'classnames';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { bytesToHumanReadableFormat } from '../../../../helpers';
import { useClampLines } from '../../../../hooks';
import { FileType } from '../../../../interfaces';
import { StyledLink } from '../../../units/styled-link/styled-link';
import { Tooltip } from '../../../units/tooltip/tooltip';
import fileDownloadBlockStyles from './style.module.scss';

const fileDownloadItemClassname = 'file-download-item';

const FileDownloadItem = ({
  extension,
  id,
  link,
  size,
  title,
  type,
}: {
  extension: string;
  id: number;
  link: string;
  size: number;
  title: string;
  type: FileType;
}) => {
  const linkWrapperRef = useRef<HTMLDivElement>(null);
  const {
    i18n: { language },
  } = useTranslation();
  const { t } = useTranslation();
  const units = useMemo(() => {
    void language;

    return ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte'].map((type) =>
      t(`file-size-units.${type}-short-title`),
    );
  }, [language, t]);

  const { isClamp } = useClampLines({ elementRef: linkWrapperRef, text: title });

  return (
    <li
      key={id}
      className={cs(
        fileDownloadBlockStyles[`${fileDownloadItemClassname}__file`],
        fileDownloadBlockStyles[`${fileDownloadItemClassname}__file_type_${type}`],
      )}
    >
      <div className={fileDownloadBlockStyles[`${fileDownloadItemClassname}__type-wrap`]}>
        <span
          className={cs(fileDownloadBlockStyles[`${fileDownloadItemClassname}__type`])}
          dangerouslySetInnerHTML={{ __html: String(extension).toUpperCase() }}
        />
      </div>
      <div className={fileDownloadBlockStyles[`${fileDownloadItemClassname}__link-wrapper`]}>
        {isClamp ? (
          <div className={fileDownloadBlockStyles[`${fileDownloadItemClassname}__tooltip`]}>
            <Tooltip text={title} />
          </div>
        ) : null}
        <div ref={linkWrapperRef}>
          <StyledLink
            className={fileDownloadBlockStyles[`${fileDownloadItemClassname}__link`]}
            dangerouslySetInnerHTML={{ __html: title }}
            download={true}
            to={link}
          />
        </div>
      </div>

      <div className={fileDownloadBlockStyles[`${fileDownloadItemClassname}__size`]}>
        <span dangerouslySetInnerHTML={{ __html: bytesToHumanReadableFormat(size, true, units, language) }} />
      </div>
    </li>
  );
};

export { FileDownloadItem };
