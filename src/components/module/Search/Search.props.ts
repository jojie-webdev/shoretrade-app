import { InputHTMLAttributes } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  containerStyle?: any;
  resetValue: () => void;
  isSellerProduct?: boolean;
}
