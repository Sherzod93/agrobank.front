import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

export class TabBlockData extends AbstractBlockData {
  readonly code: string;
  readonly title: string;

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: { code: string; title: string } },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { code, title },
    } = data;

    if (!code) {
      throw new Error('Invalid code');
    }

    if (!title) {
      throw new Error('Invalid title');
    }

    this.code = code;
    this.title = title;
  }
}
