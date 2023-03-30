import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import '../../../styles/index.scss';
import { Accordion as AccordionComponent } from './accordion';
import { AccordionItem } from './accordion-item/accordion-item';

export default {
  title: 'Components/Accordion',
  component: AccordionComponent,
} as ComponentMeta<typeof AccordionComponent>;

const Accordion: ComponentStory<typeof AccordionComponent> = ({ className }) => {
  return (
    <Router>
      <AccordionComponent className={className}>
        {items.map(({ subtitle, text, title, unfolded = false }) => (
          <AccordionItem key={title} subtitle={subtitle} title={title} unfolded={unfolded}>
            {text}
          </AccordionItem>
        ))}
      </AccordionComponent>
    </Router>
  );
};

const items = [
  {
    subtitle: 'Обычный подзаголовок',
    text: 'Обычный текст. Кредит предоставляется на приобретение строящейся квартиры, жилого дома или иного жилого помещения на первичном рынке недвижимости.',
    title: 'Тарифы',
  },
  {
    text: 'Обычный текст. Кредит предоставляется на приобретение строящейся квартиры, жилого дома или иного жилого помещения на первичном рынке недвижимости.',
    title: 'Необходимые документы',
    unfolded: true,
  },
  {
    text: 'Обычный текст. Кредит предоставляется на приобретение строящейся квартиры, жилого дома или иного жилого помещения на первичном рынке недвижимости.',
    title: 'Как диверсифицировать свои активы',
  },
  {
    text: 'Обычный текст. Кредит предоставляется на приобретение строящейся квартиры, жилого дома или иного жилого помещения на первичном рынке недвижимости.',
    title: 'Что такое терминал',
  },
];

export { Accordion };
