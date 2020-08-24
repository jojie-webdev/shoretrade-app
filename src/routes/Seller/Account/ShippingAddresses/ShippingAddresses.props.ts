import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface ShippingAddressesGeneratedProps {
  addresses: GetAddressesResponseItem[];
  pending: boolean;
}

export type QueryParams = { companyId: string };
