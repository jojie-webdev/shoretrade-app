import { Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import {
  GetActiveOffersRequestResponseItem,
  Negotiations,
  Offer,
  OfferMarketRequest,
} from 'types/store/GetActiveOffersState';
import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

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

export interface OfferDetailsProps {
  handleAcceptOffer: () => void;
  handleStartNegotiate: () => void;
  counterOffer: string;
  newOffer: string;
  thereIsNewOffer: boolean;
  isAccepted: boolean;
  selectedOffer: Offer;
  seller: any;
  nego?: Negotiations;
  negotiating: boolean;
  setNegotiating: Dispatch<SetStateAction<boolean>>;
  closeOnAccept: boolean;
  setCloseOnAccept: Dispatch<SetStateAction<boolean>>;
  sortedNegotiations: Negotiations[];
  lastNegotiationsOffers: Negotiations[];
  submitNegotiation: (counterOffer: number) => void;
  breadCrumb: any[];
  marketRequest: GetAllMarketRequestResponseItem;
  countAcceptedWeight: number;
  onClickDelete: () => void;
  showDelete: boolean;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
}
