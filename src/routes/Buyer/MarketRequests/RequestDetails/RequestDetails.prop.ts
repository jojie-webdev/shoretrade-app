import { Dispatch, SetStateAction } from 'react';

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
  price: string;
  negotiating: boolean;
  sellerOffers: GetActiveOffersRequestResponseItem[];
  setNegotiating: Dispatch<SetStateAction<boolean>>;
  setPrice: Dispatch<SetStateAction<string>>;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onClickItem: (row: any, company: any) => void;
  currentOfferId: string;
  selectedOffer: any;
  selectedCompany: any;
  handleAcceptOffer: () => void;
  counterOffer: string;
  deliveryTotal: number | undefined;
  submitNegotiation: (v: number) => void;
  hideNegotiate: boolean;
  closeOnAccept: boolean;
  setCloseOnAccept: Dispatch<SetStateAction<boolean>>;
}
