import { TableBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { TableData } from '../../table';
import { AbstractBlockData } from './abstract-block-data';

type DirectTableBlockProps = DirectBlockProps<TableBlockProps>;

export class TableBlockData extends AbstractBlockData implements DirectTableBlockProps {
  readonly table: TableData[][];
  readonly title: string;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectTableBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { table, title },
    } = data;

    this.table = table;
    this.title = title;
  }
}
