import { Dispatch, ChangeEvent, SetStateAction } from 'react';

import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';

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
  data: RequestDetail;
  currentPath: string;
  searchTerm: string;
  breadCrumbSections: any[];
  negotiating: boolean;
  sellerOffers: GetActiveOffersRequestResponseItem[];
  setNegotiating: Dispatch<SetStateAction<boolean>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onClickItem: (row: any, company: any) => void;
  currentOfferId: string;
  selectedOffer: any;
  selectedCompany: any;
}
