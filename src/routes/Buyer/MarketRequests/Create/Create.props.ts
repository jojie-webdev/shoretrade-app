import { Dispatch, SetStateAction, ReactNode } from 'react';

import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

import { CategorySelectionProps } from './CategorySelection/CategorySelection.props';
import { SelectQuantityProps } from './SelectQuantity/SelectQuantity.props';
import { SelectSizeProps, SizeOptions } from './SelectSize/SelectSize.props';
import { SelectSpecificationProps } from './SelectSpecifications/SelectSpecifications.props';
import { SummaryProps } from './Summary/Summary.props';

export interface CreateRequestStep {
  current: number;
  total: number;
}

export interface CreateRequestGeneratedProps
  extends CategorySelectionProps,
    SelectQuantityProps,
    SelectSizeProps,
    SelectSpecificationProps,
    SummaryProps {
  step: CreateRequestStep;
  termsAgreement: boolean;
  sendConfModalisOpen: boolean;
  setTermsAgreement: Dispatch<SetStateAction<boolean>>;
  onSubmitRequest: () => void;
  selectedAddress: { label: string; value: string };
  setSelectedAddress: Dispatch<{ label: string; value: string }>;
}

export interface CreateStepProps {
  stepCountComponent?: ReactNode;
  step: CreateRequestStep;
  selectedSize: SizeOptions;
  setStep: Dispatch<SetStateAction<number>>;
  onBack: (step: number) => void;
  listingFormData: GetListingFormDataResponse | null;
}
