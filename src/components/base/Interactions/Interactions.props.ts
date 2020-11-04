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
  isHover?: boolean;
  iconColor?: string;
  resultCount?: any;
  customFontSize?: number;
  noBg?: boolean;
  keepIcon?: boolean;
}
