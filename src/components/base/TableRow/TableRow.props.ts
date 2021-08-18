import { ReactElement } from 'react';

import { RowType } from 'components/module/ListingTable/Table.props';

interface TableColumn {
  name: string;
  selector: string;
  sortable?: boolean;
  component?: (data: any, state?: any) => ReactElement;
  sticky?: boolean;
  tooltip?: (data: any, state?: any) => string;
}

export interface TableRowProps {
  data: any;
  columns: TableColumn[];
  rowType?: RowType;
  onSelect?: (id: number | string) => void;
  selected?: boolean;
  handleOnSelectRow?: (state: boolean, data?: any) => void;
  onResize?: (
    position: Partial<{ x: number; y: number }>,
    columnDetails: any
  ) => any;
}

export interface TableDataListProps extends TableRowProps {
  column: any;
  index: number;
  length: number;
  identifier: string;
}
