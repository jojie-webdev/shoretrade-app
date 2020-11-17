import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const EyeOff = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;
  return (
    <svg
      width={width || 22}
      height={height || 22}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M9.94 5.08c.35-.054.705-.08 1.06-.08 3.18 0 6.17 2.29 7.91 6a15.23 15.23 0 01-.9 1.64 1 1 0 00.05 1.152 1 1 0 001.65-.102 15.78 15.78 0 001.21-2.3 1 1 0 000-.79C18.9 5.91 15.1 3 11 3a7.77 7.77 0 00-1.4.12 1.014 1.014 0 10.34 2v-.04zM2.71 1.29a1.004 1.004 0 10-1.42 1.42l3.1 3.09a14.62 14.62 0 00-3.31 4.8 1 1 0 000 .8C3.1 16.09 6.9 19 11 19a9.26 9.26 0 005.05-1.54l3.24 3.25a1.002 1.002 0 001.639-.325 1 1 0 00-.219-1.095l-18-18zm6.36 9.19l2.45 2.45a2 2 0 01-2.45-2.45zM11 17c-3.18 0-6.17-2.29-7.9-6a12.09 12.09 0 012.7-3.79L7.57 9A4 4 0 0013 14.43L14.59 16A7.24 7.24 0 0111 17z"
        fill={fill || theme.grey.shade8}
      />
    </svg>
  );
};

export default EyeOff;
