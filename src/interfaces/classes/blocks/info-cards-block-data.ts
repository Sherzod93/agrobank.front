import { InfoCardsBlockProps } from '../../../components/blocks';
import { InfoCardType } from '../../../components/blocks/info-cards-block/interfaces';
import { DirectBlockProps } from '../../abstract-block-props';
import { ProductData } from '../../product';
import { prepareMobileApplicationData } from '../helpers';
import { AbstractBlockData } from './abstract-block-data';

type DirectInfoCardsBlockProps = DirectBlockProps<InfoCardsBlockProps>;

export class InfoCardsBlockData extends AbstractBlockData implements DirectInfoCardsBlockProps {
  readonly items: DirectInfoCardsBlockProps['items'];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & { content: DirectInfoCardsBlockProps },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map((items) => {
      const result = {
        ...items,
      };

      if (result.type === InfoCardType.mobileApplication) {
        result.mobileApplicationData = prepareMobileApplicationData(result.mobileApplicationData);
      }

      return result;
    });
  }
}
