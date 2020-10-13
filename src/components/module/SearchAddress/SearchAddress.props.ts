import { InputHTMLAttributes } from 'react';

export interface SearchAddressProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  containerStyle?: any;
  resetValue: () => void;
}
