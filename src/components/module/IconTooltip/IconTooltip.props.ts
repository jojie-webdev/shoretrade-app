export interface IconTooltipProps {
  variant: Variants;
  content: string;
  iconSize?: number;
}

export type Variants = 'info' | 'alert' | 'warning' | 'error' | 'success';
