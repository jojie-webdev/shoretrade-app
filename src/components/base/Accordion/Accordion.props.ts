import { ReactNode } from 'react';

export interface AccordionProps {
  isOpen?: boolean;
  title: string;
  iconColor?: string;
  children: ReactNode;
  isCheckout?: boolean;
}
