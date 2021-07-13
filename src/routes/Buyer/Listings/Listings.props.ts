import { SortOrder } from 'types/store/GetAllBuyerListingsState';

export interface ListingViewProps {
  activeTab: number;
  handleSelectTab: (tabId: number) => void;
  sortField: string;
  setSortField: (field: string) => void;
  listings: [];
  setSearchTerm: (term: string) => void;
  isLoading: boolean | null;
  searchTerm: string;
  handleDownloadCSV: () => void;
  isDownloadingCsv: boolean;
  page: number;
  setPage: (page: number) => void;
  maxPage: number;
  isMobile: boolean;
  setSortOrder: (sortOrder: SortOrder) => void;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  selectedIds: string[];
  setSelectedIds: (params: string[]) => void;
  isAllSelected: boolean;
  setIsAllSelected: (state: boolean) => void;
  totalCount: number;
  limit: number;
  setLimit: (limit: number) => void;
}
