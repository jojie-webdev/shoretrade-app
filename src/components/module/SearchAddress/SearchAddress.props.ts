import { InputHTMLAttributes } from 'react';

import { GetAddressesResponseItem } from 'types/store/GetAddressesState';

export interface SearchAddressProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  containerStyle?: any;
  resetValue: () => void;
}