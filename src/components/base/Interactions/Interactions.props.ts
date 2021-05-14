import { ReactNode } from 'react';

export type Types =
  | 'next'
  | 'accordion'
  | 'edit'
  | 'radio'
  | 'checkbox'
  | 'none';
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
  customFontSize?: number;
  noBg?: boolean;
  fullWidth?: boolean;
  keepIcon?: boolean;
  flat?: boolean;
  fontColor?: string;
}
