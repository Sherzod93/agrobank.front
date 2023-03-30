export enum PageSectionTitleAlignment {
  center = 'center',
  end = 'end',
  start = 'start',
}

export enum PageSectionTitleSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface PageSectionTitleOptions {
  arrow: boolean;
  titleAlignment: PageSectionTitleAlignment;
  titleSize: PageSectionTitleSize;
}

export interface SectionsForSitemap {
  id: number,
  code: string,
  name: string,
  parentId: number,
  leftMargin: number,
  rightMargin: number,
  depthLevel: number,
  child: any,
}
