import { ProductAdvantageData, ProductAdvantageType } from '../../interfaces';

export const advantages: ProductAdvantageData[] = [
  {
    description: 'Без навязывания дополнительных услуг и скрытых платежей',
    id: 1,
    title: 'Прозрачные условия',
    type: ProductAdvantageType.glass,
  },
  {
    description: 'Возможность платить меньше, чем в других банках',
    id: 2,
    title: 'Низкая ставка',
    type: ProductAdvantageType.arrowDown,
  },
  {
    description: 'Консультация специалистов вплоть до полного приобретения жилья',
    id: 3,
    title: 'Помощь на всех этапах',
    type: ProductAdvantageType.headset,
  },
  {
    description: 'Консультация специалистов вплоть до полного приобретения жилья',
    id: 4,
    title: 'Помощь на всех этапах',
    type: ProductAdvantageType.headset,
  },
];
