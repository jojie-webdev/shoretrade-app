import { Path } from 'ramda';

export interface PaginateListProps {
  list: any[];
  labelPath?: Path;
  maxItemPerPage: number;
  onClickItem: (item: any) => void;
}
