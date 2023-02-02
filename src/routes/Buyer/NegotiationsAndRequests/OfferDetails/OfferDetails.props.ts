import { Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import {
  GetActiveOffersRequestResponseItem,
  Negotiations,
  Offer,
  OfferMarketRequest,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetMarketRequestResponseItem } from 'types/store/GetMarketRequestState';

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
  handleConfirmOffer: () => void;
  handleAcceptClick: (show: boolean) => void;
  handleNegoBtnClick: (show: boolean) => void;
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
  offerMR: OfferMarketRequest;
  countAcceptedWeight: number;
  onClickDelete: () => void;
  showDelete: boolean;
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  isLoadingAcceptOffer: boolean;
  isLoadingConfirmOffer: boolean;
  isLoadingOffer: boolean;
  isLoadingNegotiate: boolean;
  handlePayNow: () => void;
  showOfferSentModal: boolean;
  showConfirmOfferSentModal: boolean;
  onConfirmSentOffer: () => void;
  onCloseAcceptSentModal: () => void;
  onPayNow: () => void;
  canNegotiate?: boolean;
  clickAccept: boolean;
  handleDeclineClick: (show: boolean) => void;
  clickDecline: boolean;
}
