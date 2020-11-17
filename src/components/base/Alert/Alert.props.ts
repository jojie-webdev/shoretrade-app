import { HTMLAttributes } from 'react';

export type Variants = 'default' | 'alert' | 'warning' | 'error' | 'success';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: Variants;
  content: string;
  buttonText?: string;
  onClick?: () => void;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
  small?: boolean;
}

// Styled Props
export type AlertContainerProps = {
  variant: Variants;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
  small?: boolean;
};

export interface AlertButtonProps {
  variant: Variants;
}
