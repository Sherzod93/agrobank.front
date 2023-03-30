import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { store } from '../../../services/store';
import '../../../styles/index.scss';
import { MenuItemType, MenuType } from './interfaces';
import { Menu as MenuComponent } from './menu';

export default {
  title: 'Components/Menu',
  component: MenuComponent,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
} as ComponentMeta<typeof MenuComponent>;

const menuItems = [
  'Частным лицам',
  'Бизнесу',
  'Партнерам',
  'О банке',
  'Работа с государством',
  'Отделения и банкоматы',
  'Связь с банком',
  'Магазин',
].map((title, index, list) => ({
  link: list.length > index + 1 ? `/${index}` : 'https://yandex.ru',
  title,
  type: list.length > index + 1 ? MenuItemType.default : MenuItemType.externalLink,
}));

const MainMenu: ComponentStory<typeof MenuComponent> = ({ ...args }) => (
  <Router initialEntries={['/0']}>
    <MenuComponent {...args} menuType={MenuType.main} />
  </Router>
);

MainMenu.args = {
  menuItems,
};

const SubMenu: ComponentStory<typeof MenuComponent> = ({ ...args }) => (
  <Router initialEntries={['/0']}>
    <MenuComponent {...args} menuType={MenuType.submenu} />
  </Router>
);

SubMenu.args = {
  menuItems,
};

export { MainMenu, SubMenu };
