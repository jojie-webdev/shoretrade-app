import { Dispatch, SetStateAction } from 'react';

import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';

export interface StepProps {
  setStep?: Dispatch<SetStateAction<number>>;
  buyerRequest: GetAllMarketRequestResponseItem;
}

export interface Step1Props extends StepProps {
  isReview: boolean;
}

export interface RequestAndNegotiateGeneratedProps {
  buyerRequest: GetAllMarketRequestResponseItem;
}
