import { BlockType } from '../../../interfaces';
import { CompactProductBannerBlock } from '../compact-product-banner-block/compact-product-banner-block';
import { FileDownloadBlock } from '../file-download-block/file-download-block';
import { ImageBlock } from '../image-block/image-block';
import { LinkBlock } from '../link-block/link-block';
import { ListBlock } from '../list-block/list-block';
import { QuoteBlock } from '../quote-block/quote-block';
import { TextBannerBlock } from '../text-banner-block/text-banner-block';
import { TextBlock } from '../text-block/text-block';

const faqBlockBlockTypeToComponentMap = {
  [BlockType.compactProductBanner]: CompactProductBannerBlock,
  [BlockType.fileDownload]: FileDownloadBlock,
  [BlockType.image]: ImageBlock,
  [BlockType.link]: LinkBlock,
  [BlockType.list]: ListBlock,
  [BlockType.quote]: QuoteBlock,
  [BlockType.textBanner]: TextBannerBlock,
  [BlockType.text]: TextBlock,
};

export { faqBlockBlockTypeToComponentMap };
