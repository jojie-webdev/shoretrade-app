import { ButtonHTMLAttributes } from 'react';

import { Theme } from 'types/Theme';

import { TypographyProps } from '../Typography/Typography.props';

export type Variants =
  | 'primary'
  | 'outline'
  | 'disabled'
  | 'success'
  | 'unselected'
  | 'white';
export type IconPosition = 'before' | 'after';
export type ButtonSizes = 'lg' | 'md' | 'sm';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  color?: keyof Theme['brand'];
  text?: string | JSX.Element;
  textVariant?: TypographyProps['variant'];
  textWeight?: string;
  iconPosition?: IconPosition;
  variant?: Variants;
  icon?: JSX.Element;
  takeFullWidth?: boolean;
  size?: ButtonSizes; // defaults to md
  textColor?: keyof Theme['brand'] | keyof Theme['grey'];
  circular?: boolean;
  shortenedText?: string;
  padding?: string;
  borderRadius?: string;
  pushLeft?: boolean;
}

// Styles
export type ButtonStyleProps = {
  color?: keyof Theme['brand'];
  variant: Variants;
  iconPosition: IconPosition;
  takeFullWidth?: boolean;
  size: ButtonSizes;
};
