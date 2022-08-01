import { ReactNode } from 'react';

export type Types =
  | 'next'
  | 'accordion'
  | 'edit'
  | 'radio'
  | 'checkbox'
  | 'none'
  | 'plus';
export type IconAlignmentTypes = 'flex-start' | 'center' | 'flex-end';

export interface InteractionsProps {
  label?: string;
  type?: Types;
  value?: string;
  pressed?: boolean;
  onClick?: () => void;
  backgroundColor?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  padding?: string;
  iconAlignment?: IconAlignmentTypes;
  children?: any;
  iconColor?: string;
  resultCount?: any;
  noBg?: boolean;
  fullWidth?: boolean;
  keepIcon?: boolean;
  flat?: boolean;
  fontColor?: string;
  marginBottom?: string;
  customIcon?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  showEmptyIndicator?: boolean;
  disabled?: boolean;
}
