import { TableColumn } from 'components/module/ListingTable/Table.props';
import { SortOrder } from 'types/store/GetAllBuyerListingsState';

export interface TableHeaderProps {
  columns: TableColumn[];
  selectAll?: boolean;
  onSelectAll?: (state: boolean) => void;
  setSortField?: (field: string) => void;
  sortField?: string;
  setSortOrder?: (sortOrder: SortOrder) => void;
}
