import { Dispatch, ChangeEvent, SetStateAction, ReactNode } from 'react';

import {
  CategoryItem,
  CategorySelectionProps,
} from './CategorySelection/CategorySelection.props';
import { SelectQuantityProps } from './SelectQuantity/SelectQuantity.props';
import { SelectSizeProps } from './SelectSize/SelectSize.props';
import { SelectSpecificationProps } from './SelectSpecifications/SelectSpecifications.props';

export interface CreateRequestStep {
  current: number;
  total: number;
}

export interface CreateRequestGeneratedProps
  extends CategorySelectionProps,
    SelectQuantityProps,
    SelectSizeProps,
    SelectSpecificationProps {
  step: CreateRequestStep;
  setStep: Dispatch<SetStateAction<number>>;
  termsAgreement: boolean;
  setTermsAgreement: Dispatch<SetStateAction<boolean>>;
}

export interface CreateStepProps {
  stepCountComponent?: ReactNode;
  step: CreateRequestStep;
  onBack: () => void;
}
