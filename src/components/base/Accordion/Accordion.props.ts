import { ReactNode } from 'react';

export interface AccordionProps {
  isOpen?: boolean;
  title: string;
  children: ReactNode;
}
