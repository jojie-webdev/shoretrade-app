import { Dispatch, ChangeEvent, SetStateAction, ReactNode } from 'react';

export interface CreateRequestStep {
  current: number;
  total: number;
}

export interface CreateRequestGeneratedProps {
  step: CreateRequestStep;
  setStep: Dispatch<SetStateAction<number>>;
  termsAgreement: boolean;
  setTermsAgreement: Dispatch<SetStateAction<boolean>>;
}

export interface CreateStepProps {
  stepCountComponent?: ReactNode;
  step: CreateRequestStep;
}
