import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const RoundedTickActive = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill={fill || 'none'}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.444 1.685a10 10 0 1111.111 16.63A10 10 0 014.444 1.685zm8.275 5.105l-4.29 4.3-1.65-1.65a1 1 0 10-1.41 1.41l2.35 2.36a1 1 0 001.41 0l5-5a1.001 1.001 0 10-1.41-1.42z"
        fill="#00C48C"
      />
    </svg>
  );
};

export default RoundedTickActive;
