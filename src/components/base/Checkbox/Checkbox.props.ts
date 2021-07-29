import React from 'react';

import { TypographyProps } from 'components/base/Typography/Typography.props';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  error?: string;
  typographyProps?: Partial<TypographyProps>;
  size?: number;
  scale?: number;
  borderColor?: string;
  style?: React.CSSProperties;
  CustomIcon?: any;
}
