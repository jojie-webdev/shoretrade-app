import { HTMLAttributes, ReactNode } from 'react';

export type Variants = 'info' | 'alert' | 'warning' | 'error' | 'success';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant: Variants;
  content: ReactNode | string;
  header?: string;
  children?: ReactNode;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
}

export type AlertContainerProps = {
  variant: Variants;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
};
