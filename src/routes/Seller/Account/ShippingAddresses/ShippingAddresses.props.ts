import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface ShippingAddressesGeneratedProps {
  addresses: GetAddressesResponseItem[];
  pending: boolean;
  onClickAddress: (addressId: string) => void;
}

export type QueryParams = { companyId: string };
