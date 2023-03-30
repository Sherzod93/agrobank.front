import { nanoid } from 'nanoid';
import { MenuItemData, MenuItemType } from '../../../components/units/menu/interfaces';

interface BackendMenuItemData {
  children: BackendMenuItemData[];
  directLink?: boolean;
  externalLink?: string;
  path: string;
  text: string;
}

export interface BackendMenuData {
  [key: string]: {
    [key: string]: BackendMenuItemData[];
  };
}

class MenuItem implements MenuItemData {
  readonly children;
  readonly id;
  readonly path;
  readonly title;
  readonly type: MenuItemData['type'];
  private readonly directLink?: boolean;
  private readonly externalLink?: string;
  private readonly parent: MenuItem | null;

  constructor(menuItemData: BackendMenuItemData, parent: MenuItem | null = null) {
    this.children = (menuItemData.children?.map((menuItemData) => new MenuItem(menuItemData, this)) ??
      []) as MenuItem[];
    this.directLink = menuItemData.directLink;
    this.externalLink = menuItemData.externalLink;
    this.id = nanoid();
    this.parent = parent;
    this.path = menuItemData.path;
    this.title = menuItemData.text;
    this.type = menuItemData.externalLink ? MenuItemType.externalLink : MenuItemType.default;
  }

  get link(): string {
    if (this.externalLink) {
      return this.externalLink;
    }

    const linkPaths = [this.path];

    if (!this.directLink) {
      let parent = this.parent;

      while (parent) {
        linkPaths.push(parent.path);
        parent = parent.parent;
      }
    }

    linkPaths.push('');
    linkPaths.reverse();

    return linkPaths.join('/');
  }
}

export class Menu {
  private languageToTypeToMenuItemsMapMap: Map<string, Map<string, MenuItem[]>>;

  constructor(menuData: BackendMenuData) {
    this.languageToTypeToMenuItemsMapMap = Object.entries(menuData).reduce((result, [language, menus]) => {
      result.set(
        language.toLowerCase(),
        Object.entries(menus).reduce((result, [type, menuItemDataList]) => {
          result.set(
            type,
            menuItemDataList.map((menuItemData) => new MenuItem(menuItemData)),
          );

          return result;
        }, new Map() as Map<string, MenuItem[]>),
      );

      return result;
    }, new Map());
  }

  public getMenu(type: string, language: string): MenuItem[] | null {
    const typeToMenuItemsMap = this.languageToTypeToMenuItemsMapMap.get(language);

    if (!typeToMenuItemsMap) {
      return null;
    }

    return typeToMenuItemsMap.get(type) ?? null;
  }
}
