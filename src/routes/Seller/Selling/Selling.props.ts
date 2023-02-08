import { GetListingsBySalesChannelResponseItem } from 'types/store/GetListingsBySalesChannelState';

export interface SellingGeneratedProps {
  listings: GetListingsBySalesChannelResponseItem[];
  counter: CounterProps;
  goToListingDetails: (id: string) => void;
  showModal: boolean;
  search: string;
  onChangeSearch: (value: string) => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
  page: number;
  onChangePage: (page: number) => void;
  showAlertSuccess: boolean;
  listingDetailPreview: GetListingsBySalesChannelResponseItem;
  listingsLoading: boolean;
}

export type TagTypes = 'plain' | 'blue';

export type ItemProp = {
  id: string;
  uri: string;
  title: string;
  price: string;
  tags?: {
    label: string;
    type?: string | TagTypes;
  }[];
  size?: string;
  listedOn?: Date;
  expiresIn?: Date;
  timeLeft?: string;
  remaining?: string;
  sales?: string;
  data: GetListingsBySalesChannelResponseItem;
  unit?: string;
  originalWeight?: string;
  goToListingDetails?: (id: string) => void;
  allowNegotiations: boolean;
};

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
