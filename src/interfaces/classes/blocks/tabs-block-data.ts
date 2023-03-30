import { TabsBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectTabsBlockProps = DirectBlockProps<TabsBlockProps>;

export class TabsBlockData extends AbstractBlockData implements DirectTabsBlockProps {
  readonly code: string;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectTabsBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { code },
    } = data;

    if (!code) {
      throw new Error('Invalid code');
    }

    this.code = code;
  }
}
