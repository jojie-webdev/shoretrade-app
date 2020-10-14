import { InputHTMLAttributes } from 'react';

import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface SearchAddressProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  containerStyle?: any;
  resetValue: () => void;
}

export interface SearchGeneratedProps {
  addresses: GetAddressesResponseItem[];
  addressOptions: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  changeDefaultAddress: (id: string) => void;
}
