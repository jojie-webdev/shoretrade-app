import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface ShippingAddressesGeneratedProps {
  addresses: GetAddressesResponseItem[];
  pending: boolean;
  onClickAddress: (addressId: string) => void;
  onClickAddAddress: () => void;
  notificationMessage: string;
  errorMessage: string;
  companyRelationship?: string;
}

export type QueryParams = { companyId: string };
