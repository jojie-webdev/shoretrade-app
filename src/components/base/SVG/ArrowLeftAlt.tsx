import React from 'react';

import { SVGProps } from './SVG.props';

const ArrowLeftAlt = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '18'}
      height={height || '16'}
      viewBox="0 0 18 16"
      fill="none"
    >
      <path
        d="M16.5 7.167H6.84l1.917-1.909a.837.837 0 00-1.183-1.183L4.242 7.408a.834.834 0 00-.176.275.833.833 0 000 .634c.04.102.1.195.176.275l3.333 3.333a.833.833 0 001.183 0 .833.833 0 000-1.183L6.842 8.833H16.5a.833.833 0 100-1.666zM1.5.5a.833.833 0 00-.833.833v13.334a.833.833 0 001.666 0V1.333A.833.833 0 001.5.5z"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default ArrowLeftAlt;
