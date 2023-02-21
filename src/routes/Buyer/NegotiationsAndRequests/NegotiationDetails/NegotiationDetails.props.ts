import { Dispatch, SetStateAction } from 'react';

import {
  Negotiations,
  OfferMarketRequest,
} from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationDetailsProps {
  handleConfirmOffer: () => void;
  handleStartNegotiate: () => void;
  handleAcceptClick: (show: boolean) => void;
  handleNegoBtnClick: (show: boolean) => void;
  counterOffer: string;
  newOffer: string;
  thereIsNewOffer: boolean;
  isAccepted: boolean;
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
  negotiation: GetNegotiationByIdRequestResponseItem;
  handleAcceptConfirm: () => void;
  handleDeclineConfirm: () => void;
  handleNegoModalNegoBtnClick: (buyerNegotiatedPrice: number) => void;
  isCreateBuyerCounterNegotiationPending: boolean;
  handleNegoBtnClick2: () => void;
  showBuyerCounterNegoModal: boolean;
}
