import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Lock = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 12}
      height={height || 14}
      viewBox="0 0 12 14"
      fill="none"
      {...props}
    >
      <path
        d="M6 7.667a.993.993 0 00-.667 1.74v.926a.667.667 0 101.334 0v-.926A.993.993 0 006 7.667zM9.333 5V3.667a3.333 3.333 0 00-6.666 0V5a2 2 0 00-2 2v4.667a2 2 0 002 2h6.666a2 2 0 002-2V7a2 2 0 00-2-2zM4 3.667a2 2 0 114 0V5H4V3.667zm6 8a.667.667 0 01-.667.666H2.667A.667.667 0 012 11.667V7a.667.667 0 01.667-.667h6.666A.667.667 0 0110 7v4.667z"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default Lock;
