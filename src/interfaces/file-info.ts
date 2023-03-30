import { FileType } from './enums';

export interface FileInfo {
  extension: string;
  id: number;
  link: string;
  size: number;
  title: string;
  type: FileType;
}
