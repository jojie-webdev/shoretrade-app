import { CSSProperties, HTMLAttributes } from 'react';

import { Theme } from 'types/Theme';

export type Variants =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'title5'
  | 'title6'
  | 'copy'
  | 'body'
  | 'label'
  | 'caption'
  | 'small'
  | 'overline'
  | 'overlineSmall';

export interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  variant?: Variants;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  weight?: string;
  align?: 'center' | 'left' | 'right';
  component?: string;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
  margin?: string;
}
