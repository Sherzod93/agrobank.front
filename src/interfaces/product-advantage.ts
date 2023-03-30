export enum ProductAdvantageType {
  arrowCornerwise = 'arrowCornerwise',
  arrowDown = 'arrowDown',
  arrowUpDown = 'arrowUpDown',
  cash = 'cash',
  chair = 'chair',
  chain = 'chain',
  check = 'check',
  clock = 'clock',
  control = 'control',
  cursor = 'cursor',
  diploma = 'diploma',
  eye = 'eye',
  glass = 'glass',
  headset = 'headset',
  heart = 'heart',
  lightning = 'lightning',
  padlock = 'padlock',
  safeBox = 'safeBox',
  shield = 'shield',
  sun = 'sun',
  sweden = 'sweden',
  thumpUp = 'thumpUp',
  universe = 'universe',
  victory = 'victory',
  wiFi = 'wiFi',
}

export interface ProductAdvantageData {
  description: string;
  id: number;
  title: string;
  type: ProductAdvantageType;
}
