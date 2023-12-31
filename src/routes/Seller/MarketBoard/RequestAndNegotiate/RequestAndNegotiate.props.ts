import { Dispatch, SetStateAction } from 'react';

import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';

import { TABS } from '../Landing/Landing.constants';
import { Option } from './MakeOffer/MakeOffer.props';

export interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
  buyerRequest: GetAllMarketRequestResponseItem;
}

export interface CommonProps {
  isReview: boolean;
  buyerRequest: GetAllMarketRequestResponseItem;
  activeOffer: GetActiveOffersRequestResponseItem;

  onNegotiateOffer: (id: string, price: number, accepted?: boolean) => void;

  isNegotiating: boolean;
  negotiation: GetAllNegoRequestResponseItem & {
    expiry: any;
  };
  selectedTab: TABS;
}

export interface Step1Props extends StepProps, CommonProps {
  userPending: boolean;
  buyerRequestForActiveOfferTab?: GetAllMarketRequestResponseItem;
  handleAcceptBtnClick: () => void;
  showAcceptModal: boolean;
  handleDeclineBtnClick: () => void;
  handleCancelBtnClick: () => void;
  handleConfirmBtnClick: () => void;
  showDeclineModal: boolean;
}

export interface OfferProps {
  offer: MarketOfferItem[];
  offerSpecs: Option[];
  setOfferSpecs: Dispatch<SetStateAction<Option[]>>;
  setOffer: Dispatch<SetStateAction<MarketOfferItem[]>>;
  currentOfferItem: string;
  setCurrentOfferItem: Dispatch<SetStateAction<string>>;
}

export interface RequestAndNegotiateGeneratedProps
  extends CommonProps,
    OfferProps {
  userPending: boolean;
  buyerRequestForActiveOfferTab?: GetAllMarketRequestResponseItem;
  onConfirmSentOffer: () => void;
  showOfferSentModal: boolean;
  showOfferAcceptSentModal: boolean;
  handleDeclineBtnClick: () => void;
  handleAcceptBtnClick: () => void;
  handleCancelBtnClick: () => void;
  handleConfirmBtnClick: () => void;
  showAcceptModal: boolean;
  showDeclineModal: boolean;
}
