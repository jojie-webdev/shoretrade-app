import React from 'react';

import { SVGProps } from './SVG.props';

const Minus = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 12}
      height={height || 2}
      viewBox="0 0 12 2"
      fill="none"
    >
      <path
        d="M10.668.333H1.335a.667.667 0 100 1.334h9.333a.667.667 0 000-1.334z"
        fill={fill || '#7F8498'}
      />
    </svg>
  );
};

export default Minus;
