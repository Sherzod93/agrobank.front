export interface FilterItemData {
  id: number;
  code: string;
  title: string;
}

export interface FilterData {
  code: string;
  defaultItemId?: number;
  items: FilterItemData[];
  isShowsMultipleValue?: boolean;
  withAllOption?: boolean;
}
