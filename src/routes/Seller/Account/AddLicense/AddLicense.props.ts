import { Dispatch, SetStateAction } from 'react';

import { SellerLicense } from 'types/store/GetSellerLicenseState';
import { State } from 'types/store/GetStatesState';

export interface AddLicenseGeneratedProps {
  onSave: () => void;
  licenseName: string;
  setLicenseName: Dispatch<SetStateAction<string>>;
  licenseFile: File | null | string;
  setLicenseFile: Dispatch<SetStateAction<File | null | string>>;
  licenseFileBack: File | null | string;
  setLicenseFileBack: Dispatch<SetStateAction<File | null | string>>;
  isUpdating: boolean;
  licenses: SellerLicense[];
  onPressDelete?: () => void;
  hasLicenseBack: boolean;
  setHasLicenseBack: Dispatch<SetStateAction<boolean>>;
  expirationDate: Date | null;
  setExpirationDate: Dispatch<SetStateAction<Date | null>>;
  onClickAddLicense: () => void;
  isEdit?: boolean;
  licenseFileName?: string;
  states: State[];
  stateId: string;
  setStateId: Dispatch<SetStateAction<string>>;
  companyId: string;
}
