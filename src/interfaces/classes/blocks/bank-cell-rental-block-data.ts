import { BankCellRentalProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectBankCellRentalBlockProps = DirectBlockProps<BankCellRentalProps>;

export class BankCellRentalBlockData extends AbstractBlockData implements DirectBankCellRentalBlockProps {
  readonly bankCellSizes;
  readonly buttonTitle;
  readonly canBeApplied;
  readonly title;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectBankCellRentalBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { bankCellSizes, buttonTitle, canBeApplied, title },
    } = data;

    this.bankCellSizes = bankCellSizes;
    this.buttonTitle = buttonTitle;
    this.canBeApplied = canBeApplied;
    this.title = title;
  }
}
