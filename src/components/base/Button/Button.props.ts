import { ButtonHTMLAttributes } from 'react';

import { Theme } from 'types/Theme';

export type Variants = 'primary' | 'outline' | 'disabled';
export type IconPosition = 'before' | 'after';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: keyof Theme['brand'];
  text?: string;
  iconPosition: IconPosition;
  variant: Variants;
  icon: JSX.Element;
  children: any;
}

export type ButtonStyleProps = {
  color?: keyof Theme['brand'];
  variant: Variants;
  iconPosition: IconPosition;
};
