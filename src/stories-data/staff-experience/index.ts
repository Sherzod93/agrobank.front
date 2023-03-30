import { CommentData } from '../../components/blocks/staff-experience-block/interfaces';
import { ImageInfoData } from '../../interfaces';
import personListImage from './resources/person-list-image.png';

export const staffExperience: CommentData[] = [
  {
    id: 1,
    person: {
      id: 1,
      name: 'Глеб',
      photo: {
        alt: '',
        size: {
          height: 550,
          width: 443,
        },
        srcSets: [
          {
            src: personListImage,
            type: 'image/png',
          },
        ],
      } as ImageInfoData as any,
      position: 'product owner',
    },
    text: 'На международной арене банк имеет высокий авторитет. Мне нравится участвовать в крупных проектах и быть частью чего-то большего. Это дает сильный буст для меня как мастера своего дела, так и личности.',
  },
  {
    id: 2,
    person: {
      id: 2,
      name: 'Самир',
      photo: {
        alt: '',
        size: {
          height: 550,
          width: 443,
        },
        srcSets: [
          {
            src: personListImage,
            type: 'image/png',
          },
        ],
      } as ImageInfoData as any,
      position: '',
    },
    text: 'Среди профессионалов своего дела, где каждый стремится к росту, ты учишься и развиваешься в разы быстрее.',
  },
  {
    id: 3,
    person: {
      id: 3,
      name: 'Самир',
      photo: {
        alt: '',
        size: {
          height: 550,
          width: 443,
        },
        srcSets: [
          {
            src: personListImage,
            type: 'image/png',
          },
        ],
      } as ImageInfoData as any,
      position: 'таргетолог',
    },
    text: 'Агробанк дает возможность постоянно обучаться, внедрять и адаптировать новые практики в процессе работы.',
  },
];
