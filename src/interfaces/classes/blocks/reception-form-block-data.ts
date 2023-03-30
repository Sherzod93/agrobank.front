import { AbstractBlockData } from './abstract-block-data';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { ReceptionFormBlockProps } from '../../../components/blocks/reception-form/reception-form';

type DirectReceptionFormBlockProps = DirectBlockProps<ReceptionFormBlockProps>;
export class ReceptionFormBlockData extends AbstractBlockData implements DirectReceptionFormBlockProps {
    constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectReceptionFormBlockProps }, contextProduct?: ProductData) {
        super(data, contextProduct);
    }
}