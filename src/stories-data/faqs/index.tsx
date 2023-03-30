import { BlockType, FaqItemData } from '../../interfaces';

export const faqs: FaqItemData[] = [
  {
    id: 1,
    title: 'Вопрос 1',
    blocks: [
      {
        type: BlockType.text,
        content: { text: 'Ответ на <em>первый</em> вопрос' },
      } as any,
    ],
  },
  {
    id: 2,
    title: 'Вопрос 2',
    blocks: [
      {
        type: BlockType.text,
        content: { text: 'Ответ на <em>второй</em> вопрос' },
      } as any,
    ],
  },
  {
    id: 3,
    title: 'Вопрос 3',
    blocks: [
      {
        type: BlockType.text,
        content: { text: 'Ответ на <em>третий</em> вопрос' },
      } as any,
    ],
  },
  {
    id: 4,
    title: 'Вопрос 4',
    blocks: [
      {
        type: BlockType.text,
        content: { text: 'Ответ на <em>четвертый</em> вопрос' },
      } as any,
    ],
  },
  {
    id: 5,
    title: 'Вопрос 5',
    blocks: [
      {
        type: BlockType.text,
        content: { text: 'Ответ на <em>пятый</em> вопрос' },
      } as any,
    ],
  },
];
