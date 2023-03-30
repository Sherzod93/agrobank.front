export enum MenuItemType {
  default = 'default',
  externalLink = 'external-link',
  menuExpander = 'menu-expander',
}

export interface MenuItemData {
  readonly children?: MenuItemData[];
  readonly id?: string;
  readonly link?: string;
  readonly title: string;
  readonly type: MenuItemType;
}
