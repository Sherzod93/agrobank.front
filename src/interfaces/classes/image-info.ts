export interface ImageInfoData {
  alt?: string;
  size: {
    height: number;
    width: number;
  };
  srcSets: {
    src: string;
    type: string;
  }[];
}

export class ImageInfo {
  static webpSupport = false;

  readonly alt: string;
  readonly height: number;
  readonly width: number;

  constructor({ alt: imageAlt, size: { height: imageHeight, width: imageWidth }, srcSets = [] }: ImageInfoData) {
    if (srcSets.length === 0) {
      throw new Error('No any src for image ');
    }

    this.alt = imageAlt ?? '';
    this.height = imageHeight;
    this.width = imageWidth;

    Object.defineProperties(this, {
      _src: {
        value: srcSets[0].src,
      },
      _webpSrc: {
        value: srcSets.find(({ type }) => type === 'image/webp')?.src,
      },
    });
  }

  get src() {
    if (ImageInfo.webpSupport && (this as any)._webpSrc) {
      return (this as any)._webpSrc;
    }

    return (this as any)._src;
  }
}
