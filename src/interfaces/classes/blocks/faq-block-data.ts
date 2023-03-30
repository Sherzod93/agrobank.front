import { faqBlockBlockTypeToComponentMap, FaqBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { BlockType } from '../../enums';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';
import { CompactProductBannerBlockData } from './compact-product-banner-block-data';
import { FileDownloadBlockData } from './file-download-block-data';
import { ImageBlockData } from './image-block-data';
import { LinkBlockData } from './link-block-data';
import { ListBlockData } from './list-block-data';
import { QuoteBlockData } from './quote-block-data';
import { TextBannerBlockData } from './text-banner-block-data';
import { TextBlockData } from './text-block-data';

type DirectFaqBlockProps = DirectBlockProps<FaqBlockProps>;

export const faqBlockBlockTypeToDataClassMap: {
  [key in keyof typeof faqBlockBlockTypeToComponentMap]: typeof AbstractBlockData;
} = {
  [BlockType.compactProductBanner]: CompactProductBannerBlockData,
  [BlockType.fileDownload]: FileDownloadBlockData,
  [BlockType.image]: ImageBlockData,
  [BlockType.link]: LinkBlockData,
  [BlockType.list]: ListBlockData,
  [BlockType.quote]: QuoteBlockData,
  [BlockType.textBanner]: TextBannerBlockData,
  [BlockType.text]: TextBlockData,
};

const faqBlockBlockTypesSet = new Set(
  Object.entries(faqBlockBlockTypeToDataClassMap)
    .filter(([, dataClass]) => dataClass)
    .map(([type]) => type),
);

export class FaqBlockData extends AbstractBlockData implements DirectFaqBlockProps {
  readonly items: DirectFaqBlockProps['items'];

  constructor(data: Pick<AbstractBlockData, 'type'> & { content: DirectFaqBlockProps }, contextProduct?: ProductData) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map((item) => ({
      ...item,
      blocks: item.blocks
        .map((blockData) => {
          const { type } = blockData;

          try {
            if (faqBlockBlockTypesSet.has(type)) {
              return new faqBlockBlockTypeToDataClassMap[type as keyof typeof faqBlockBlockTypeToDataClassMap]!(
                blockData as any,
                undefined,
              );
            }

            console.warn(`Unsupported block type: ${blockData.type}`);
          } catch (e) {
            console.warn(`Block ${blockData.type}`, e);
          }

          return null;
        })
        .filter((block) => !!block) as AbstractBlockData[],
    }));
  }
}
