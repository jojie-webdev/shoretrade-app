import { ReactDropdownProps } from 'react-dropdown';

export interface SelectProps extends ReactDropdownProps {
  label?: string;
  error?: string;
  size?: 'small' | 'large';
  height?: string;
  dark?: boolean;
  grey?: boolean;
  border?: string;
  padding?: string;
  borderRadius?: string;
  background?: string;
  unbordered?: boolean;
  marginTop?: string;
  arrowIcon?: JSX.Element;
}

export interface DropdownProps {
  dark?: boolean;
  grey?: boolean;
  disabled?: boolean;
  border?: string;
  background?: string;
  borderRadius?: string;
  unbordered?: boolean;
  marginTop?: string;
  height?: string;
  padding?: string;
}
