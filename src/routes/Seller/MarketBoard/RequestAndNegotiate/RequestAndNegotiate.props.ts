import { Dispatch, SetStateAction } from 'react';

import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

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
}

export interface Step1Props extends StepProps, CommonProps {
  userPending: boolean;
}

export interface OfferProps {
  offer: MarketOfferItem[];
  setOffer: Dispatch<SetStateAction<MarketOfferItem[]>>;
  currentOfferItem: string;
  setCurrentOfferItem: Dispatch<SetStateAction<string>>;
}

export interface RequestAndNegotiateGeneratedProps
  extends CommonProps,
    OfferProps {
  userPending: boolean;
}
