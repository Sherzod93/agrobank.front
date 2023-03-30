import { CarouselBlockProps } from '../../../components/blocks';
import { BlockWithItemsComponentProps, DirectBlockProps } from '../../abstract-block-props';
import { AdviceData, AdviceFilterItemData } from '../../advice';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { extendAdviceDataItems } from './helpers';

type DirectCarouselBlockProps = DirectBlockProps<CarouselBlockProps>;

interface BackendContent extends Omit<DirectCarouselBlockProps, 'items'>, BlockWithItemsComponentProps<AdviceData> {
  sections: AdviceFilterItemData[];
}

type ContentData = BackendContent | DirectCarouselBlockProps;

function isBackendContent(content: BackendContent | DirectCarouselBlockProps): content is BackendContent {
  return (content as BackendContent).sections !== undefined;
}

export class CarouselBlockData extends AbstractBlockData implements DirectCarouselBlockProps {
  readonly items: DirectCarouselBlockProps['items'];
  readonly linkToAllItems;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: ContentData }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const { content } = data;
    const { linkToAllItems } = content;

    if (isBackendContent(content)) {
      this.items = extendAdviceDataItems(content);
    } else {
      this.items = content.items;
    }

    this.linkToAllItems = linkToAllItems;
  }
}
