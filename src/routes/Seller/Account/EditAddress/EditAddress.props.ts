import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface EditAddressGeneratedProps {
  address: PlaceData | null;
  isDefault: boolean | null;
  pending: boolean;
  onClickSave: (values: EditAddressForm) => void;
  toggleIsDefault: () => void;
}

export interface EditAddressForm {
  address: string;
  unitNumber: string;
}

export type QueryParams = { companyId: string; addressId: string };
