import { ReactNode } from 'react';

export interface AccordionProps {
  isOpen?: boolean;
  title: string;
  iconColor?: string;
  children: ReactNode;
  noBg?: boolean;
  padding?: string;
  marginBottom?: string;
  background?: string;
  innerContentPadding?: string;
  withBackground?: boolean;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  keepIcon?: boolean;
}
