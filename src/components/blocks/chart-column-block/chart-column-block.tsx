import { FC } from 'react';
import {
    AbstractBlockProps,
    BlockWithItemsComponentProps,
    ChartColumnComponentProps,
} from '../../../interfaces';
import cs from 'classnames';
import { Chart } from 'react-google-charts';

import chartColumnStyles from './style.module.scss';

const chartColumnClassname = 'chart-column-block';
export interface ChartColumnBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<ChartColumnComponentProps> {
}
const ChartColumnBlock: FC<ChartColumnBlockProps> = ({ className, items }) => {

    const drawChart = (items:any) => {
        var types = ['Year'].concat(items.types);
        var params = [types].concat(items.items);

        const arOptions = {
            legend: { position: 'top' },
            height: 600,

        };
        return (
            <Chart
                loader={<div>Загрузка...</div>}
                chartType={'ColumnChart'}
                height={'600px'}
                width={'100%'}
                data={params}
                options={arOptions}
            />
        );

    };

    // const data = [
    //     ['Yil', 'Aktivlar', 'Kreditlar','Kapital','Majburiyatlar'],
    //     ['Jan', 8, 12, 16,14], // RGB value
    //     ['Feb', 10, 12, 16,25], // English color name
    //     ['March', 19, 12, 16,19],
    //     ['April', 21, 12,16,21], // CSS-style declaration
    // ];


    return (
        <div className={cs(chartColumnStyles[chartColumnClassname], className)}>
            <div className={chartColumnStyles[`${chartColumnClassname}__chart`]}>
                <div className={chartColumnStyles[`${chartColumnClassname}__chart_box`]}>
                    { drawChart(items) }
                </div>
            </div>
        </div>
    );
};

export { ChartColumnBlock };