import React from 'react';

import { SVGProps } from './SVG.props';

const Ellipse = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 8}
      height={height || 8}
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill={fill || '#E35D32'} />
    </svg>
  );
};

export default Ellipse;
