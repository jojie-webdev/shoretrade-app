import { MouseEvent } from 'react';

import {
  ColumnType,
  RowType,
} from 'components/module/ListingTable/Table.props';

type onResize = (
  position: Partial<{ x: number; y: number }>,
  columnDetails: any
) => any;

export interface TableDataContentProps {
  children?: any;
  rowType?: RowType;
  columnType?: ColumnType;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  sticky?: boolean;
  onResize?: onResize;
  column?: any;
}

export interface TableDataProps {
  columnType?: ColumnType;
  rowType?: RowType;
  children?: any;
  sorted?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  sticky?: boolean;
  selected?: boolean;
  handleOnSelect?: (state: boolean, data?: any) => void;
  onResize?: onResize;
  column?: any;
}
export interface ResizerComponentProps extends Partial<TableDataContentProps> {
  defaultSize: any;
}
