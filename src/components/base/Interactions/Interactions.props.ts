import { ReactNode } from 'react';

export type Types = 'next' | 'accordion' | 'edit' | 'radio' | 'checkbox';

export interface InteractionsProps {
  label?: string;
  type?: Types;
  value: string;
  pressed?: boolean;
  onPress: () => void;
  backgroundColor?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  padding?: string;
}
