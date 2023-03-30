
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { VoteBlockProps } from '../../../components/blocks';

export class VoteResultBlockData extends AbstractBlockData implements VoteBlockProps {
    readonly items;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: VoteBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { items },
        } = data;

        this.items = items;
    }
}
