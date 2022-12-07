import { CSSProperties, HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLParagraphElement> {
  children: any;
  align?: 'center' | 'left' | 'right';
  style?: CSSProperties;
  className?: string;
  badgeColor?: string;
  fontColor?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  borderRadius?: string;
}
