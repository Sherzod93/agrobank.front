import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateDetail } from '../../../helpers';
import { AbstractBlockProps, BlockWithItemsComponentProps, FilterItemData } from '../../../interfaces';
import { VacancyData } from '../../../interfaces/vacancy';
import { StyledLink } from '../../units/styled-link/styled-link';
import otherVacanciesBlockStyles from './style.module.scss';

const otherVacanciesBlockClassname = 'other-vacancies-block';

export interface OtherVacanciesBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<VacancyData> {
  regions: FilterItemData[];
}

const OtherVacanciesBlock: FC<OtherVacanciesBlockProps> = ({ className, items, regions }) => {
  const {
    i18n: { language, t },
  } = useTranslation();
  const regionIdToRegionMap = useMemo(
    () =>
      regions.reduce((result, region) => {
        result.set(region.id, region);

        return result;
      }, new Map<number, FilterItemData>()),
    [regions],
  );

  return (
    <ul className={cs(otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}`], className)}>
      {items.map(
        ({
          date: vacancyDate,
          id: vacancyId,
          regionId: vacancyRegionId,
          title: vacancyTitle,
          url: vacancyDetailPageUrl,
        }) => {
          const vacancyRegionTitle = regionIdToRegionMap.get(vacancyRegionId)?.title ?? '';

          return (
            <li key={vacancyId} className={otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}__item`]}>
              <div className={otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}__details`]}>
                <span
                  className={otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}__city`]}
                  dangerouslySetInnerHTML={{ __html: vacancyRegionTitle }}
                />
                {', '}
                <span
                  className={otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}__date`]}
                  dangerouslySetInnerHTML={{ __html: formatDateDetail(vacancyDate, language, t) }}
                />
              </div>
              <div>
                <StyledLink
                  className={otherVacanciesBlockStyles[`${otherVacanciesBlockClassname}__title`]}
                  dangerouslySetInnerHTML={{ __html: vacancyTitle }}
                  to={vacancyDetailPageUrl}
                />
              </div>
            </li>
          );
        },
      )}
    </ul>
  );
};

export { OtherVacanciesBlock };
