import { AbstractBlockData } from './abstract-block-data';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { PageStatisticBlockProps } from '../../../components/blocks/page-statistic-block/page-statistic-block';

type DirectPageStatisticBlockProps = DirectBlockProps<PageStatisticBlockProps>;
export class PageStatisticBlockData extends AbstractBlockData implements DirectPageStatisticBlockProps {
    constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectPageStatisticBlockProps }, contextProduct?: ProductData) {
        super(data, contextProduct);
    }
}