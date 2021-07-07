import { InputHTMLAttributes } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: any;
  resetValue?: () => void;
  value: string;
  rounded?: boolean;
  style?: any;
}
