import { Dispatch, SetStateAction } from 'react';

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
  isTablet: boolean;
  setSortOrder: (sortOrder: SortOrder) => void;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  isAllSelected: boolean;
  setIsAllSelected: (state: boolean) => void;
  totalCount: number;
  limit: number;
  setLimit: (limit: number) => void;
  tableSettings: string[];
  setTableSettings: (settings: string[]) => void;
  showTableSettings: boolean;
  setShowTableSettings: (state: boolean) => void;
  prevListingData: any[];
}
