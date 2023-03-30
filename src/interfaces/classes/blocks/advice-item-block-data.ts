import { AdviceItemBlockProps } from '../../../components/blocks';
import { BlockWithItemsComponentProps, DirectBlockProps } from '../../abstract-block-props';
import { AdviceData, AdviceFilterItemData } from '../../advice';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { extendAdviceDataItems } from './helpers';

type DirectAdviceItemBlockProps = DirectBlockProps<AdviceItemBlockProps>;

interface AdviceListContent
  extends Omit<DirectAdviceItemBlockProps, 'items'>,
    BlockWithItemsComponentProps<AdviceData> {
  sectionIdToSectionMap: Map<number, AdviceFilterItemData>;
}

interface BackendContent extends Omit<DirectAdviceItemBlockProps, 'items'>, BlockWithItemsComponentProps<AdviceData> {
  sections: AdviceFilterItemData[];
}

type ContentData = AdviceListContent | BackendContent | DirectAdviceItemBlockProps;

function isAdviceListContent(content: ContentData): content is AdviceListContent {
  return (content as AdviceListContent).sectionIdToSectionMap !== undefined;
}

function isBackendContent(content: ContentData): content is BackendContent {
  return (content as BackendContent).sections !== undefined;
}

export class AdviceItemBlockData extends AbstractBlockData implements DirectAdviceItemBlockProps {
  readonly items: DirectAdviceItemBlockProps['items'];

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: ContentData }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const { content } = data;

    if (isBackendContent(content) || isAdviceListContent(content)) {
      this.items = extendAdviceDataItems(content);
    } else {
      this.items = content.items;
    }
  }
}
