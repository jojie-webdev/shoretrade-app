import { InputHTMLAttributes } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  resetValue: () => void;
}
