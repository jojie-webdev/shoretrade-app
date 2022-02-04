import { ReactNode } from 'react';

import { Types } from '../Interactions/Interactions.props';

export interface AccordionProps {
  isOpen?: boolean;
  title: string;
  iconColor?: string;
  children: ReactNode;
  noBg?: boolean;
  padding?: string;
  marginBottom?: string;
  background?: string;
  border?: string;
  headerBorder?: string;
  contentBorder?: string;
  innerContentPadding?: string;
  withBackground?: boolean;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  bottomComponent?: ReactNode;
  keepIcon?: boolean;
  sameWidth?: boolean;
  type?: Types;
}
