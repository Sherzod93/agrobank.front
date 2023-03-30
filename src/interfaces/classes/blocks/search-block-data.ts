import { SearchBlockProps } from '../../../components/blocks';
import { DirectBlockProps } from '../../abstract-block-props';
import { AbstractBlockData } from './abstract-block-data';

type DirectSearchBlockProps = DirectBlockProps<SearchBlockProps>;

export class SearchBlockData extends AbstractBlockData implements DirectSearchBlockProps {}
