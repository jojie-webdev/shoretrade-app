import React from 'react';

import { SVGProps } from './SVG.props';

const SubtractHollow = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.444 1.685a10 10 0 1111.112 16.63A10 10 0 014.444 1.685zM14 9H6a1 1 0 100 2h8a1 1 0 000-2z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default SubtractHollow;
