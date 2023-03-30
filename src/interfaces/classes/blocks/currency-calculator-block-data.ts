import { CurrencyCalculatorBlockProps } from '../../../components/blocks/currency-calculator-block/currency-calculator-block';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectCurrencyCalculatorBlockProps = DirectBlockProps<CurrencyCalculatorBlockProps>;

export class CurrencyCalculatorBlockData extends AbstractBlockData implements DirectCurrencyCalculatorBlockProps {
    readonly items;

    constructor(
        data: Pick<AbstractBlockData, 'type'> & { content: DirectCurrencyCalculatorBlockProps },
        contextProduct?: ProductData,
    ) {
        super(data, contextProduct);

        const {
            content: { items },
        } = data;

        this.items = items;
    }
}
