import React from 'react';

import { Theme } from 'types/Theme';

export interface IconTooltipProps {
  variant?: Variants;
  content: string | React.ReactNode;
  iconSize?: number;
  placement?: 'bottom' | 'top' | 'right' | 'left';
  placementOffset?: string;
  iconFill?: string;
  margin?: number;
  label?: string | React.ReactNode;
  labelColor?: keyof Theme['brand'] | keyof Theme['grey'];
}

export type Variants =
  | 'info'
  | 'alert'
  | 'warning'
  | 'error'
  | 'success'
  | 'negotiationInfo';
