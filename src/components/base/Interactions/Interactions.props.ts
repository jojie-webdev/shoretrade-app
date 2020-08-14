import { ReactNode } from 'react';

export type Types = 'next' | 'accordion' | 'edit' | 'radio' | 'checkbox';
export type IconAlignmentTypes = 'flex-start' | 'center' | 'flex-end';

export interface InteractionsProps {
  label?: string;
  type?: Types;
  value?: string;
  pressed?: boolean;
  onClick: () => void;
  backgroundColor?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  padding?: string;
  iconAlignment?: IconAlignmentTypes;
  children?: any;
}
