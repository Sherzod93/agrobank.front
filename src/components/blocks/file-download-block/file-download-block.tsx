import cs from 'classnames';
import React, { FC } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps, FileInfo, FileType } from '../../../interfaces';
import { FileDownloadItem } from './components/file-download-item';
import fileDownloadBlockStyles from './style.module.scss';

const fileDownloadBlockClassname = 'file-download-block';

export interface FileDownloadBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<FileInfo> {}

const FileDownloadBlock: FC<FileDownloadBlockProps> = ({ className, items }) => (
  <ul
    className={cs(
      fileDownloadBlockStyles[fileDownloadBlockClassname],
      {
        [fileDownloadBlockStyles[`${fileDownloadBlockClassname}__on-center`]]: items.length === 1,
      },
      className,
    )}
  >
    {items.map(({ extension, id, link, size, title, type = FileType.unknown }) => {
      return (
        <FileDownloadItem key={id} extension={extension} id={id} link={link} size={size} title={title} type={type} />
      );
    })}
  </ul>
);

export { FileDownloadBlock };
