import cs from 'classnames';
import { FC, useMemo } from 'react';
import { useBaseBackgroundColor } from '../../../../../contexts';
import { WithClassNameComponentProps } from '../../../../../interfaces';
import { VacancyData } from '../../../../../interfaces/vacancy';
import { useVacanciesListBlock } from '../../../../page-sections/contexts';
import { StyledLink } from '../../../../units/styled-link/styled-link';
import vacancyStyles from './style.module.scss';

const vacancyBlockClassname = 'vacancy';

export interface VacancyBlockProps {
  vacancy: VacancyData;
}

const Vacancy: FC<VacancyBlockProps & WithClassNameComponentProps> = ({ className, vacancy }) => {
  const { baseBackgroundColor } = useBaseBackgroundColor();
  const { regionIdToRegionMap } = useVacanciesListBlock();
  const { regionId: vacancyRegionId, title: vacancyTitle, url: vacancyUrl } = vacancy;
  const vacancyRegionTitle = useMemo(
    () => regionIdToRegionMap.get(vacancyRegionId)?.title ?? '',
    [regionIdToRegionMap, vacancyRegionId],
  );

  return (
    <li
      className={cs(
        vacancyStyles[`${vacancyBlockClassname}`],
        vacancyStyles[`${vacancyBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      <div className={vacancyStyles[`${vacancyBlockClassname}__title`]}>
        <StyledLink dangerouslySetInnerHTML={{ __html: vacancyTitle }} to={vacancyUrl} />
      </div>
      <div
        className={vacancyStyles[`${vacancyBlockClassname}__city`]}
        dangerouslySetInnerHTML={{ __html: vacancyRegionTitle }}
      />
    </li>
  );
};

export { Vacancy };
