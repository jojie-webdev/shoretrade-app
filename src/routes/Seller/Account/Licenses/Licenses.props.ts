import { Dispatch, SetStateAction } from 'react';

import { SellerLicense } from 'types/store/GetSellerLicenseState';

export interface LicensesGeneratedProps {
  onSave: () => void;
  licenseName: string;
  setLicenseName: Dispatch<SetStateAction<string>>;
  licenseFile: File | null;
  setLicenseFile: Dispatch<SetStateAction<File | null>>;
  isUpdating: boolean;
  licenses: SellerLicense[];
  onPressDelete: (id: string) => void;
}
