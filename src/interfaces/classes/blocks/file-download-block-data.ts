import { FileDownloadBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { FileType } from '../../enums';
import { FileInfo } from '../../file-info';
import { ProductData } from '../../product';
import { AbstractBlockData } from './abstract-block-data';

type DirectFileDownloadBlockProps = DirectBlockProps<FileDownloadBlockProps>;

const mimeTypeToFileTypeMap = new Map<string, FileType>([
  ['application/msword', FileType.doc],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', FileType.doc],
  ['application/vnd.ms-excel', FileType.xls],
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', FileType.xls],
  ['image/jpeg', FileType.jpg],
  ['image/png', FileType.png],
  ['application/pdf', FileType.pdf],
]);

export class FileDownloadBlockData extends AbstractBlockData implements DirectFileDownloadBlockProps {
  readonly items: FileInfo[];

  constructor(
    data: Pick<AbstractBlockData, 'type'> & {
      content: DirectFileDownloadBlockProps;
    },
    contextProduct?: ProductData,
  ) {
    super(data, contextProduct);

    const {
      content: { items },
    } = data;

    this.items = items.map((file) => ({
      ...file,
      type: mimeTypeToFileTypeMap.get(file.type) ?? FileType.unknown,
    }));
  }
}
