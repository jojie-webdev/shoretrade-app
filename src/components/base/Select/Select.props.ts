import { ReactDropdownProps } from 'react-dropdown';

export interface SelectProps extends ReactDropdownProps {
  label?: string;
  error?: string;
  size?: 'small' | 'large';
  dark?: boolean;
  grey?: boolean;
  border?: string
  borderRadius?: string
  background?: string
}
