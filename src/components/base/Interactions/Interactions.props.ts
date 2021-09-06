import { ReactNode } from 'react';

import { Offer } from 'types/store/GetActiveOffersState';

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
  noBg?: boolean;
  fullWidth?: boolean;
  keepIcon?: boolean;
  flat?: boolean;
  fontColor?: string;
  offers?: Offer[];
}
