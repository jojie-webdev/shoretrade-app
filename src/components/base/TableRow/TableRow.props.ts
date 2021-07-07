import { ReactElement } from 'react';

import { RowType } from 'components/module/ListingTable/Table.props';

interface TableColumn {
  name: string;
  selector: string;
  sortable?: boolean;
  component?: (data: any, state?: any) => ReactElement;
  sticky?: boolean;
}

export interface TableRowProps {
  data: any;
  columns: TableColumn[];
  rowType?: RowType;
  onSelect?: (id: number | string) => void;
  selected?: boolean;
  handleOnSelectRow?: (state: boolean, data?: any) => void;
}
