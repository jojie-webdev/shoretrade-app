import { Dispatch } from 'react';

import { PlaceData } from 'types/PlaceData';

export interface EditAddressGeneratedProps {
  address: PlaceData | null;
  isDefault: boolean | null;
  pending: boolean;
  unitNumber: string;
  onClickSave: () => void;
  toggleIsDefault: () => void;
  setAddress: Dispatch<PlaceData | null>;
  setUnitNumber: Dispatch<string>;
}

export type QueryParams = { companyId: string; addressId: string };
