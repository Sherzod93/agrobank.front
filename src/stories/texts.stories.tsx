import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { FC } from 'react';
import '../styles/index.scss';

const TextsComponent: FC = () => (
  <div>
    <h1>Text styles</h1>
    <h2>Headings</h2>
    <h1>H1</h1>
    <h2>H2</h2>
    <h3>H3</h3>
    <h4>H4</h4>
    <hr />
    <h2>Headings (class styling)</h2>
    <div className={'h1'}>H1</div>
    <div className={'h2'}>H2</div>
    <div className={'h3'}>H3</div>
    <div className={'h4'}>H4</div>
    <hr />
    <h2>Body</h2>
    <div className={'text text_body_1'}>Body 1</div>
    <div className={'text text_body_2'}>Body 2</div>
    <div className={'text text_body_3'}>Body 3</div>
    <div className={'text text_body_4'}>Body 4</div>
    <hr />
  </div>
);

export default {
  title: 'Common/Texts',
  component: TextsComponent,
} as ComponentMeta<typeof TextsComponent>;

const Texts: ComponentStory<typeof TextsComponent> = () => {
  return <TextsComponent />;
};

export { Texts };
