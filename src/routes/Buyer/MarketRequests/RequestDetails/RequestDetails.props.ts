import { Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import {
  GetActiveOffersRequestResponseItem,
  Negotiations,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

export type RequestDetail = {
  id: string;
  type: string;
  offers: number;
  image: string;
  status: string;
  expiry: string;
  weight: { from: number; to: number };
  measurementUnit: string;
};

export enum MarketRequestOfferTip {
  Negotiation = 'Negotiation',
  GreatValue = 'Great Value',
  AboveMarket = 'Above Market',
}

export interface MarketRequestOffer {
  sellerId: string;
  sellerRating: string;
  sellerName: string;
  id: string; //offerid
  status: string;
  specs: string[];
  price: {
    value: number;
    currency: string;
  };
  weight: {
    unit: string;
    value: number;
  };
  tip: MarketRequestOfferTip;
}

export interface MarketRequestDetailProps {
  data: any;
  totalOffers: number;
  marketRequestId: string;
  filteredBuyerRequest?: GetAllMarketRequestResponseItem;
  currentPath: string;
  measurementUnit: string;
  searchTerm: string;
  breadCrumbSections: any[];
  sellerOffers: GetActiveOffersRequestResponseItem[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onClickItem: (row: any, company: any) => void;
  currentOfferId: string;
  selectedOffer: any;
  selectedCompany: any;
  closeOnAccept: boolean;
  setCloseOnAccept: Dispatch<SetStateAction<boolean>>;
  onClickDelete: () => void;
  showDelete: boolean;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  filterModalProps: FilterModalProps;
  onClickFilterButton: () => void;
  isLoading: boolean;
  onOfferDelete: (offerIdToDelete: string) => void;
}
