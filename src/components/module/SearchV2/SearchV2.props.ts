import { InputHTMLAttributes } from 'react';

export interface SearchV2Props extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: any;
  resetValue?: () => void;
  value: string;
  rounded?: boolean;
  style?: any;
}
