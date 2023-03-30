import { FileInfo, FileType } from '../../interfaces';

export const fileItems: FileInfo[] = [
  {
    extension: 'pdf',
    id: 1,
    link: '',
    size: 1234000,
    title: 'Памятка по безопасности при использовании карт',
    type: FileType.pdf,
  },
  {
    extension: 'doc',
    id: 2,
    link: '',
    size: 1400000,
    title: 'Условия выпуска и обслуживания карт',
    type: FileType.doc,
  },
  {
    extension: 'jpg',
    id: 3,
    link: '',
    size: 9234000,
    title: 'Мультивалютная карта. Тарифы и условия',
    type: FileType.jpg,
  },
  {
    extension: 'qqz',
    id: 4,
    link: '',
    size: 9234000,
    title: 'Мультивалютная карта. Тарифы и условия',
    type: FileType.unknown,
  },
];
