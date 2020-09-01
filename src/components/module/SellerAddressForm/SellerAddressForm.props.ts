import { Dispatch } from 'react';

import { PlaceData } from 'types/PlaceData';

export interface SellerAddressFormProps {
  address: PlaceData;
  isDefault: boolean | null;
  pending: boolean;
  isSuccess: boolean;
  unitNumber: string;
  onClickSave: () => void;
  toggleIsDefault: () => void;
  setAddress: Dispatch<PlaceData | null>;
  setUnitNumber: Dispatch<string>;
}

export type QueryParams = { companyId: string; addressId: string };
