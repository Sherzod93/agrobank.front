import { FC, useState } from 'react';
import { AbstractBlockProps, BlockWithItemsComponentProps } from '../../../interfaces';
import cs from 'classnames';


import chartPieStyles from './style.module.scss';
import { Chart } from 'react-google-charts';
import { useMatchMedia } from '../../../hooks';
import { Breakpoints, breakpointsToMediaQuery } from '../../../helpers';

const chartPieClassname = 'chart-pie-block';

export interface ChartPieBlockProps extends AbstractBlockProps, BlockWithItemsComponentProps<any> {
}
const ChartPieBlock: FC<ChartPieBlockProps> = ({ className, items }) => {

    const [isMobile, setIsMobile] = useState(false);

    useMatchMedia({
        callback: setIsMobile,
        mediaQuery: breakpointsToMediaQuery({ to: Breakpoints.md }),
    });
    const drawChart2 = () => {
        const data = [['Task', 'Hours per Day']].concat(items);
        const options = {
            legend: {
                alignment: 'center',
                position: isMobile ? 'top' : '',
                maxLines: 5,

            },
            pieHole: 0.5,
        };
        return (
            <Chart
                className={chartPieStyles[`${chartPieClassname}__chart_box`]}
                chartType='PieChart'
                data={data}
                options={options}
            />
        );

    };
    return (
        <div className={cs(chartPieStyles[chartPieClassname], className)}>
            <div className={chartPieStyles[`${chartPieClassname}__chart`]}>
                <div className={chartPieStyles[`${chartPieClassname}__chart_box`]}>
                    { drawChart2() }
                </div>
            </div>
        </div>
    );
};

export { ChartPieBlock };