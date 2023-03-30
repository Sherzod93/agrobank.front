import { PersonData } from '../../../../interfaces';

export interface CommentData {
  id: number;
  person: PersonData;
  text: string;
}
