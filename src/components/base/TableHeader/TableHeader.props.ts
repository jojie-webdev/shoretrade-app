import { TableColumn } from 'components/module/ListingTable/Table.props';

export interface TableHeaderProps {
  columns: TableColumn[];
  selectAll?: boolean;
  onSelectAll?: (state: boolean) => void;
  setSortField?: (field: string) => void;
  sortField?: string;
}
