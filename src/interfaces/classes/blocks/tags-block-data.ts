import { TagsBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareProductTagData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectTagsBlockProps = DirectBlockProps<TagsBlockProps>;

export class TagsBlockData extends AbstractBlockData implements DirectTagsBlockProps {
  readonly items: DirectTagsBlockProps['items'];
  readonly tagsAlignment;

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectTagsBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { items, tagsAlignment },
    } = data;

    this.items = items.map(prepareProductTagData);
    this.tagsAlignment = tagsAlignment;
  }
}
