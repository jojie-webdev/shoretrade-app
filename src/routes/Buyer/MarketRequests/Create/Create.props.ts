import { Dispatch, ChangeEvent, SetStateAction, ReactNode } from 'react';

import {
  CategoryItem,
  CategorySelectionProps,
} from './CategorySelection/CategorySelection.props';

export interface CreateRequestStep {
  current: number;
  total: number;
}

export interface CreateRequestGeneratedProps extends CategorySelectionProps {
  step: CreateRequestStep;
  setStep: Dispatch<SetStateAction<number>>;
  termsAgreement: boolean;
  setTermsAgreement: Dispatch<SetStateAction<boolean>>;
  selectedCategory: CategoryItem;
}

export interface CreateStepProps {
  stepCountComponent?: ReactNode;
  step: CreateRequestStep;
  onBack: () => void;
}
