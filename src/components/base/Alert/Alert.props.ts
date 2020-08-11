import { HTMLAttributes } from 'react';

export type Variants = 'default' | 'alert' | 'warning' | 'error' | 'success';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: Variants;
  content: string;
  buttonText?: string;
  onClick?: () => void;
}

// Styled Props
export type AlertContainerProps = {
  variant: Variants;
};

export interface AlertButtonProps {
  variant: Variants;
}
