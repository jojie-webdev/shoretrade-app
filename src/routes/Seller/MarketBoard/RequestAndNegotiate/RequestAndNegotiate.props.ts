import { Dispatch, SetStateAction } from 'react';

import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

export interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
  buyerRequest: GetAllMarketRequestResponseItem;
}

export interface Step1Props extends StepProps {
  isReview: boolean;
}

export interface OfferProps {
  offer: MarketOfferItem[];
  setOffer: Dispatch<SetStateAction<MarketOfferItem[]>>;
}

export interface RequestAndNegotiateGeneratedProps extends OfferProps {
  buyerRequest: GetAllMarketRequestResponseItem;
}
