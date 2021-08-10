import { MouseEvent } from 'react';

import {
  ColumnType,
  RowType,
} from 'components/module/ListingTable/Table.props';

export interface TableDataContentProps {
  children?: any;
  rowType?: RowType;
  columnType?: ColumnType;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  sticky?: boolean;
  id?: string;
}

export interface TableDataProps {
  id?: string;
  columnType?: ColumnType;
  rowType?: RowType;
  children?: any;
  sorted?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  sticky?: boolean;
  selected?: boolean;
  handleOnSelect?: (state: boolean, data?: any) => void;
}
