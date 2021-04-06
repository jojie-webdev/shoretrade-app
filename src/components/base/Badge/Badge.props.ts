import { CSSProperties, ReactHTMLElement, HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  align?: 'center' | 'left' | 'right';
  style?: CSSProperties;
  className?: string;
  badgeColor?: string;
  fontColor?: string;
}
