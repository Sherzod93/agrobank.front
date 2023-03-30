import cs from 'classnames';
import React, { FC, useRef, useState } from 'react';
import { useBaseBackgroundColor } from '../../../contexts';
import { Breakpoints, breakpointsToMediaQuery } from '../../../helpers';
import { useMatchMedia } from '../../../hooks';
import { AbstractBlockProps, TableData } from '../../../interfaces';
import headerBlockStyles from '../header-block/style.module.scss';
import tableBlockStyles from './style.module.scss';

const headerBlockClassname = 'header-block';
export const tableBlockClassname = 'table-block';

export interface TableBlockProps extends AbstractBlockProps {
  table: TableData[][];
  title: string;
}

const TableBlock: FC<TableBlockProps> = ({ className, table, title }) => {
  const labelsRef = useRef<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { baseBackgroundColor } = useBaseBackgroundColor();
  useMatchMedia({
    callback: setIsMobile,
    mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
  });

  return (
    <div
      className={cs(
        tableBlockStyles[`${tableBlockClassname}`],
        tableBlockStyles[`${tableBlockClassname}_base-background-color_${baseBackgroundColor}`],
        className,
      )}
    >
      {title && (
        <h2
          className={cs(
            headerBlockStyles[`${headerBlockClassname}`],
            headerBlockStyles[`${headerBlockClassname}_size_small`],
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}

      {isMobile ? (
        <div>
          {table.map((tableItem: TableData[], itemIndex) => {
            if (tableItem[itemIndex]?.type === 'th') {
              tableItem.map(({ type, value }, index) => labelsRef.current.push(tableItem[index].value));

              return null;
            }

            return (
              <div className={tableBlockStyles[`${tableBlockClassname}__item`]}>
                {tableItem.map(({ type, value }, index) => (
                  <div
                    className={tableBlockStyles[`${tableBlockClassname}__subitem`]}
                    key={`${type}${itemIndex}${index}`}
                  >
                    <div
                      className={tableBlockStyles[`${tableBlockClassname}__label`]}
                      dangerouslySetInnerHTML={{ __html: labelsRef.current[index] }}
                    />
                    <div dangerouslySetInnerHTML={{ __html: value }} />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <table>
          {table.map((tableItem: TableData[], index) => (
            <tr key={`tr${index}`}>
              {tableItem.map(({ type: TagName, value, width }, indexTagName) => (
                <TagName
                  dangerouslySetInnerHTML={{ __html: value }}
                  key={`${TagName}${indexTagName}`}
                  style={{ width: width }}
                />
              ))}
            </tr>
          ))}
        </table>
      )}
    </div>
  );
};

export { TableBlock };
