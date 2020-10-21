import { ButtonHTMLAttributes } from 'react';

import { Theme } from 'types/Theme';

import { TypographyProps } from '../Typography/Typography.props';

export type Variants =
  | 'primary'
  | 'outline'
  | 'disabled'
  | 'success'
  | 'unselected';
export type IconPosition = 'before' | 'after';
export type ButtonSizes = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: keyof Theme['brand'];
  text?: string;
  textVariant?: TypographyProps['variant'];
  textWeight?: string;
  iconPosition?: IconPosition;
  variant?: Variants;
  icon?: JSX.Element;
  takeFullWidth?: boolean;
  size?: ButtonSizes; // defaults to md
}

// Styles
export type ButtonStyleProps = {
  color?: keyof Theme['brand'];
  variant: Variants;
  iconPosition: IconPosition;
  takeFullWidth?: boolean;
  size: ButtonSizes;
};
