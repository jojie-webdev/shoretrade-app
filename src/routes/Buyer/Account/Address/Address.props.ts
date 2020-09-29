import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface AccountDeliveryGeneratedProps {
  addresses: GetAddressesResponseItem[];
  pending: boolean;
  goToAddAddress: () => void;
  goToEditAddress: (addressId: string) => void;
}
