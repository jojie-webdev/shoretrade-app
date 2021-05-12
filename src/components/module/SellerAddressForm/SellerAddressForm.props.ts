import { Dispatch } from 'react';

import { PlaceData } from 'types/PlaceData';

export interface SellerAddressFormProps {
  companyId: string;
  address: PlaceData | null;
  isDefault: boolean | null;
  pending: boolean;
  isSuccess: boolean;
  unitNumber: string;
  onClickSave: () => void;
  toggleIsDefault: () => void;
  setAddress: Dispatch<PlaceData>;
  setUnitNumber: Dispatch<string>;
  type: 'EDIT' | 'CREATE';
  onDeleteAddress?: () => void;
}

export type QueryParams = { companyId: string; addressId: string };
