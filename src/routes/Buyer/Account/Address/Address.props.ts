import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface AccountDeliveryGeneratedProps {
  addresses: GetAddressesResponseItem[];
  pending: boolean;
  notificationMessage: string;
  goToAddAddress: () => void;
  goToEditAddress: (addressId: string) => void;
}
