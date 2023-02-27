import { Dispatch, SetStateAction } from 'react';

import { PlaceData } from 'types/PlaceData';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { State } from 'types/store/GetStatesState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';

export interface License {
  file: File | null;
  fileName: string;
  fileBack?: File | null;
  stateId?: string;
  expiredAt?: string;
}

export interface RegistrationDetails {
  // user
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile_cc: string;
  mobile_no: string;

  // business
  businessName: string;
  abn: string;
  address: PlaceData | null;
  unitNumber: string;
  businessLogo: File | null;

  // bank
  accountName: string;
  bsb: string;
  accountNumber: string;

  // SFM number
  sfmNumber: string | null;

  // payment method
  cardNumber: string;
  cardExpiryDate: string;
  cardCvc: string;
  cardName: string;
  cardBillingAddress: string;
  cardZipCode: string;
  cardCity: string;
  cardState: string;
  cardToken: string;

  selectedMarketSector: string;

  subscriptionPreference: {
    plan: string;
    addOns: string[];
    transactionValue: string;
  };

  tncAgreement: boolean;
  categoryMarketSector: string;

  //license
  licenses: License[];

  // DDA
  isDDA: boolean;
}

export interface BankDetails {
  accountName: string;
  bsb: string;
  accountNumber: string;
}

export interface RegisterGeneratedProps {
  plans: GetSubscriptionPlansResponseData[];
  licenseStates?: State[];
  backToLogin: () => void;
  registrationDetails: RegistrationDetails;
  updateRegistrationDetails: Dispatch<Partial<RegistrationDetails>>;
  register: (details: RegistrationDetails) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: string;
  categories: Category[];
  getCategoryItem: (id: string) => void;
  categoryItems: CategoryType[];
  isGotoDetails?: boolean;
  showDetails: () => void;
  hideDetails: () => void;
  selectedCategoryTypes: CategoryPayload[];
  addSelected: (category: {
    id: string;
    name: string;
    categoryId: string;
  }) => void;
  searchCategory: Category[];
  searchCategoryType: CategoryType[];
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onChangeSearch: (search: string, category: string) => void;
  forceSearch: (search: string, category: string) => void;
  isSummaryEdit: boolean;
  setSummaryEdit: () => void;
  interestedInShorePay: boolean;
  handleSelectShorePay: (shorePay: boolean) => void;
  handleDownloadApplicationForm: () => void;
  goToLogIn: () => void;
  onRemoveSelectedCategory: (name: string) => void;
  states: { value: string; label: string }[];
}
export interface Field {
  label: string;
  key: string;
  secured?: boolean;
  alert?: string;
  type?: string;
  prefix?: string;
  placeholder?: string;
  tooltipText?: string;
}
export interface StepFormProps extends RegisterGeneratedProps {
  formikProps: {
    initialValues: Record<string, string>;
    validate?: (attributes: Record<string, string>) => Record<string, string>;
    onSubmit: (values: Record<string, string>) => void;
  };
  step: number;
  previousStep?: () => void;
  fields: Field[];
  summaryHandleStep: (step: number) => void;
  paymentMethod?: 'card' | 'dda';
  setPaymentMethod?: (type: 'card' | 'dda') => void;
}
