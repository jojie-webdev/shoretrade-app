import { CSSProperties, ReactHTMLElement, HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  weight?: string;
  align?: 'center' | 'left' | 'right';
  component?: string;
  style?: CSSProperties;
  className?: string;
  badgeColor?: string;
  fontColor?: string;
}
