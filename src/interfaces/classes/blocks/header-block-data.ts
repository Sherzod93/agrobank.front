import { HeaderBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { PageSectionTitleAlignment, PageSectionTitleSize } from '../../page-section';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectHeaderBlockProps = DirectBlockProps<HeaderBlockProps>;

export class HeaderBlockData extends AbstractBlockData implements DirectHeaderBlockProps {
  readonly arrow;
  readonly title;
  readonly titleAlignment;
  readonly titleSize;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectHeaderBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { arrow, title, titleAlignment, titleSize },
    } = data;

    this.arrow = arrow;
    this.title = title;
    this.titleAlignment = titleAlignment ?? PageSectionTitleAlignment.center;
    this.titleSize = titleSize ?? PageSectionTitleSize.medium;
  }
}
