import { Dispatch, SetStateAction } from 'react';

import {
  SortOrder,
  GetAllBuyerListingResponseItem,
} from 'types/store/GetAllBuyerListingsState';

export interface ListingViewProps {
  listings: GetAllBuyerListingResponseItem[];
  handleDownloadCSV: () => void;
  isDownloadingCsv: boolean;
  isMobile: boolean;
  isTablet: boolean;
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  isAllSelected: boolean;
  setIsAllSelected: (state: boolean) => void;
  tableSettings: string[];
  setTableSettings: (settings: string[]) => void;
  showTableSettings: boolean;
  setShowTableSettings: (state: boolean) => void;
  prevListingData: any[];
  unselectedIds: string[];
  setUnselectedIds: Dispatch<SetStateAction<string[]>>;
  handleSelectRow: (id: string, state: boolean) => any;
  isPending: boolean;
  counter: CounterProps;
  totalCount: number;
  totalPage: number;
  search: string;
  onChangeSearch: (value: string) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  page: number;
  onChangePage: (page: number) => void;
  sorting: {
    field: string;
    order: string;
  };
  onChangeSortField: (field: string) => void;
  onChangeSortOrder: (field: string) => void;
  goToProductDetails: (id: string) => void;
}

export interface CounterProps {
  allListing: number;
  directSale: number;
  aquafuture: number;
  preAuction: number;
}

export interface SearchFilterProps {
  allListing: string;
  directSale: string;
  aquafuture: string;
  preAuction: string;
}

export interface TabPageFilterProps {
  allListing: number;
  directSale: number;
  aquafuture: number;
  preAuction: number;
}

export interface TabSortProps {
  allListing: string;
  directSale: string;
  aquafuture: string;
  preAuction: string;
}
