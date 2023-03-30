import cs from 'classnames';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterData, RemittanceProductData, WithClassNameComponentProps } from '../../../../../interfaces';
import { Filter, FilterAppearance } from '../../../../units/filters/components';
import remittanceCountriesFilterStyles from './style.module.scss';

export interface RemittanceCountriesFilterProps {
  defaultCountries?: [string, string];
  items: RemittanceProductData[];
  onDestinationCountryCodeChange: (countryCode: string) => void;
  onSourceCountryCodeChange: (countryCode: string) => void;
}

const remittanceCountriesFilterClassname = 'remittance-countries-filter';

const RemittanceCountriesFilter: FC<RemittanceCountriesFilterProps & WithClassNameComponentProps> = ({
  className,
  defaultCountries,
  items,
  onDestinationCountryCodeChange,
  onSourceCountryCodeChange,
}) => {
  const {
    i18n: { t },
  } = useTranslation();
  const [filters, filterConstants] = useMemo(() => {
    const filterConstants = [
      {
        case: 'g',
        code: 'src',
        onChange: onSourceCountryCodeChange,
        title: t('filters.product-list-block_from-country'),
      },
      {
        case: 'a',
        code: 'dest',
        onChange: onDestinationCountryCodeChange,
        title: t('filters.product-list-block_to-country'),
      },
    ];

    return [
      items
        .reduce(
          (result, { countries }) => {
            countries?.forEach(([sourceCountry, destinationCountry]) => {
              result[0].add(sourceCountry);
              result[1].add(destinationCountry);
            });

            return result;
          },
          [new Set<string>(), new Set<string>()],
        )
        .map((set) => [...set])
        .map((countryCodes, index): FilterData => {
          const defaultCountryCode = defaultCountries?.[index] ?? countryCodes[0];
          const defaultItemId = countryCodes.findIndex((countryCode) => countryCode === defaultCountryCode) + 1;

          return {
            code: filterConstants[index].code,
            defaultItemId,
            items: countryCodes.map((sourceCountryCode, ix) => ({
              code: sourceCountryCode,
              id: ix + 1,
              title:
                t(`filters.product-list-block_country-${sourceCountryCode}_${filterConstants[index].case}`) ||
                sourceCountryCode,
            })),
          };
        }),
      filterConstants,
    ];
  }, [defaultCountries, items, onDestinationCountryCodeChange, onSourceCountryCodeChange, t]);

  if (filters.some(({ items }) => items.length === 0)) {
    return null;
  }

  return (
    <div className={cs(remittanceCountriesFilterStyles[remittanceCountriesFilterClassname], className)}>
      <div className={remittanceCountriesFilterStyles[`${remittanceCountriesFilterClassname}__directions-wrapper`]}>
        {filters.map((filter, index) => (
          <div
            key={filterConstants[index].code}
            className={cs(remittanceCountriesFilterStyles[`${remittanceCountriesFilterClassname}__direction`], {
              [remittanceCountriesFilterStyles[`${remittanceCountriesFilterClassname}__without-direction-titles`]]:
                !filterConstants[index].title,
            })}
          >
            {filterConstants[index].title && (
              <span
                className={remittanceCountriesFilterStyles[`${remittanceCountriesFilterClassname}__direction-title`]}
                dangerouslySetInnerHTML={{ __html: filterConstants[index].title }}
              />
            )}
            <Filter
              appearance={FilterAppearance.tag}
              filter={filter}
              onChange={({ id: itemId }) => {
                const { code } = filter.items.find(({ id }) => id === itemId)!;

                filterConstants[index].onChange(code);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { RemittanceCountriesFilter };
