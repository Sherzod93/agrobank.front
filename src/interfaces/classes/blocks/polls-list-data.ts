
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { PollsListBlockProps } from '../../../components/blocks';

export class PollsListBlockData extends AbstractBlockData implements PollsListBlockProps {
    readonly items;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: PollsListBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { items },
        } = data;

        this.items = items;
    }
}
