import { Dispatch, SetStateAction } from 'react';

import { SellerLicense } from 'types/store/GetSellerLicenseState';

export interface LicensesGeneratedProps {
  licenses: SellerLicense[];
  onClickAddLicense: () => void;
  onClickEditLicense: (id: string) => void;
  onDeleteLicense: (id: string) => void;
  loading: boolean;
  showSuccess: boolean;
  setShowSuccess: Dispatch<SetStateAction<boolean>>;
}

export type LicenseOption = {
  value: string;
  label: string;
  image: string | File | null;
  pending?: boolean;
  expiredAt?: string;
};
