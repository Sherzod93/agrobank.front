import { ImageInfo } from './classes';

export enum PersonContactType {
  email = 'email',
  link = 'link',
  phone = 'phone',
  text = 'text',
}

export interface PersonContact {
  id: number;
  title: string;
  type: PersonContactType;
  value: string;
}

export interface PersonData {
  bio?: string;
  contacts?: PersonContact[];
  id: number;
  name: string;
  photo?: ImageInfo;
  position: string;
  unfolded?: boolean;
}
