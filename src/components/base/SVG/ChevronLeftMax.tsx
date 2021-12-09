import React from 'react';

import { SVGProps } from './SVG.props';

const ChevronLeftMax = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
      fill={fill}
    >
      <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
      <path fill="none" d="M24 24H0V0h24v24z"></path>
    </svg>
  );
};

export default ChevronLeftMax;
