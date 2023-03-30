import { AbstractBlockData } from './abstract-block-data';
import { DirectBlockProps } from '../../abstract-block-props';
import { SiteMapBlockProps } from '../../../components/blocks/site-map-block/site-map-block';
import { ProductData } from '../../product';

type DirectSiteMapBlockProps = DirectBlockProps<SiteMapBlockProps>;
export class SiteMapData extends AbstractBlockData implements DirectSiteMapBlockProps {
    readonly items;
    constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectSiteMapBlockProps }, contextProduct?: ProductData) {
        super(data, contextProduct);
        const {
            content: { items },
        } = data;

        this.items = items;
    }
}