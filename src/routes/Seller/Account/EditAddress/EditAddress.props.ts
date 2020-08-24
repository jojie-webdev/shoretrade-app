import { PlaceData } from 'types/PlaceData';
import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface EditAddressGeneratedProps {
  address: PlaceData | null;
  isDefault: boolean;
}

export type QueryParams = { companyId: string; addressId: string };
