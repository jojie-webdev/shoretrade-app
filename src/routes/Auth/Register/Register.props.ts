import { Dispatch } from 'react';

import { PlaceData } from 'types/PlaceData';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';

export interface RegistrationDetails {
  // user
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  mobile: string;
  callingCode: string;

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

  // payment method
  selectedPaymentMethod: string;
  estimatedAnnualRevenue: string;
  selectedMarketSector: string;

  tncAgreement: boolean;
  categoryMarketSector: string;

  //license
  licenses: { file: File | null; fileName: string }[];
}

export interface BankDetails {
  accountName: string;
  bsb: string;
  accountNumber: string;
}

export interface RegisterGeneratedProps {
  backToLogin: () => void;
  registrationDetails: RegistrationDetails;
  updateRegistrationDetails: Dispatch<Partial<RegistrationDetails>>;
  register: (details: RegistrationDetails) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: string;
  isApplicationForLineCredit: boolean;
  categories: Category[];
  getCategoryItem: (id: string) => void;
  categoryItems: CategoryType[];
  isGotoDetails?: boolean;
  showDetails: () => void;
  hideDetails: () => void;
  selectedCategoryTypes: CategoryPayload[];
  addSelected: (category: CategoryPayload) => void;
  searchCategory: Category[];
  searchCategoryType: CategoryType[];
  searchTerm: string;
  onChangeSearch: (search: string) => void;
  isSummaryEdit: boolean;
  setSummaryEdit: () => void;
}
