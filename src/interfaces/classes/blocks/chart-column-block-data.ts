
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { ChartColumnBlockProps } from '../../../components/blocks';

export class ChartColumnBlockData extends AbstractBlockData implements ChartColumnBlockProps {
    readonly items;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: ChartColumnBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { items },
        } = data;

        this.items = items;
    }
}
