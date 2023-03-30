
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { ChartPieBlockProps } from '../../../components/blocks';

export class ChartPieBlockData extends AbstractBlockData implements ChartPieBlockProps {
    readonly items;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: ChartPieBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { items },
        } = data;

        this.items = items;
    }
}
