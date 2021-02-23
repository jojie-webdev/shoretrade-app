import { Dispatch, ChangeEvent, SetStateAction } from 'react';

export interface CreateRequestStep {
  current: number;
  total: number;
}

export interface CreateRequestGeneratedProps {
  step: CreateRequestStep;
  termsAgreement: boolean;
  setTermsAgreement: Dispatch<SetStateAction<boolean>>;
}
