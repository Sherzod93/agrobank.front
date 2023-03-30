import { ControlApplyingBlockProps } from '../../../components/page-sections/blocks/control-applying-block/control-applying-block';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

export class ControlApplyingBlockData extends AbstractBlockData implements ControlApplyingBlockProps {
    readonly fields;
    readonly titles;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: ControlApplyingBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { fields, titles },
        } = data;

        this.fields = fields;
        this.titles = titles;
    }
}
