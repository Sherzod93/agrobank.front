import cs from 'classnames';
import React, { FC } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { AbstractBlockProps } from '../../../interfaces';

import videoBlockStyles from './style.module.scss';

const videoBlockClassname = 'video-block';

export interface VideoBlockProps extends AbstractBlockProps {
  description?: string;
  title: string;

}

const VideoBlock: FC<VideoBlockProps> = ({ className, description, title }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();

  // @ts-ignore
  return (
    <div
      className={cs(
          videoBlockStyles[videoBlockClassname],
          videoBlockStyles[`${videoBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >

      <div
        className={videoBlockStyles[`${videoBlockClassname}__title`]}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {description ? (
          <iframe className={videoBlockStyles[`${videoBlockClassname}__description`]} src={`https://www.youtube.com/embed/${description.split('watch?v=')[1]}`} />
      ) : null}
    </div>
  );
};

export { VideoBlock };
