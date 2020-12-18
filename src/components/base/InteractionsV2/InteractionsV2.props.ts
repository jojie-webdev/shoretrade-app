import { ReactNode } from 'react';

import { CategoryPayload } from 'types/store/GetCategories';
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
  arrayValue?: CategoryPayload[];
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
  fullWidth?: boolean;
  keepIcon?: boolean;
}
