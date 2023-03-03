import { HTMLAttributes, ReactNode } from 'react';

export type Variants =
  | 'info'
  | 'alert'
  | 'warning'
  | 'error'
  | 'success'
  | 'infoAlert'
  | 'primary';

export interface SellerNegotiationAlertProps
  extends HTMLAttributes<HTMLDivElement> {
  variant: Variants;
  iconRight?: ReactNode;
  content: ReactNode | string;
  header?: string;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
  status: string;
}

export type AlertContainerProps = {
  variant: Variants;
  alignText?: 'flex-start' | 'center';
  fullWidth?: boolean;
};
