import { Dispatch } from 'react';

import { PlaceData } from 'types/PlaceData';

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
}
