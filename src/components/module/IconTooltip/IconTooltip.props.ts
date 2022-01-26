import React from 'react';

export interface IconTooltipProps {
  variant: Variants;
  content: string | React.ReactNode;
  iconSize?: number;
  placement?: 'bottom' | 'top' | 'right' | 'left';
  iconFill?: string;
}

export type Variants = 'info' | 'alert' | 'warning' | 'error' | 'success';
