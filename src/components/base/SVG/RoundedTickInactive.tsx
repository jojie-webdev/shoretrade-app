import React from 'react';

import { SVGProps } from './SVG.props';

const RoundedTickInactive = (props: SVGProps): JSX.Element => {
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
        d="M12.72 6.79l-4.29 4.3-1.65-1.65a1 1 0 10-1.41 1.41l2.35 2.36a1 1 0 001.41 0l5-5a1 1 0 10-1.41-1.42zM10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
        fill="#E5E9F5"
      />
    </svg>
  );
};

export default RoundedTickInactive;
