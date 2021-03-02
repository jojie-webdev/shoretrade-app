import { Dispatch, SetStateAction } from 'react';

import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

export interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
}

export interface Step1Props extends StepProps {
  isReview: boolean;
  buyerRequest: GetAllMarketRequestResponseItem;
}

export interface RequestAndNegotiateGeneratedProps {
  buyerRequest: GetAllMarketRequestResponseItem;
}
