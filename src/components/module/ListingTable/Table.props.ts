import { ReactElement } from 'react';

import { SortOrder } from 'types/store/GetAllBuyerListingsState';

export type RowType = 'header' | 'first-row' | 'last-row';
export type ColumnType = 'column-first' | 'column-last';

export interface TableColumn {
  name: string;
  selector: string;
  sortable?: boolean;
  component?: (data: any, state?: any) => ReactElement;
  sticky?: boolean;
}

export interface TableComponentProps {
  columnTemplate: string[];
  columns: TableColumn[];
  data?: any[];
  sortField?: string;
  setSortField?: (field: string) => void;
  isLoading?: boolean;
  searchTerm?: string;
  setSortOrder?: (sortOrder: SortOrder) => void;
  selectedIds: string[];
  setSelectedIds: (params: string[]) => void;
  isAllSelected: boolean;
  setIsAllSelected: (state: boolean) => void;
}
