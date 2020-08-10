import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Check = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 15}
      height={height || 12}
      viewBox="0 0 15 12"
      fill="none"
      {...props}
    >
      <path
        d="M14.21 1.21a.999.999 0 00-1.42 0L5.34 8.67 2.21 5.53A1.022 1.022 0 10.79 7l3.84 3.84a1 1 0 001.42 0l8.16-8.16a.999.999 0 000-1.47z"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default Check;
