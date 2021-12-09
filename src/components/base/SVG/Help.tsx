import React from 'react';

import { SVGProps } from './SVG.props';

const Help = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 14}
      height={height || 14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M6.527 9.193a1.053 1.053 0 00-.08.1.507.507 0 00-.06.12.427.427 0 00-.04.12.907.907 0 000 .134.56.56 0 00.053.253.6.6 0 00.36.36.626.626 0 00.507 0 .6.6 0 00.36-.36.667.667 0 00.04-.253.667.667 0 00-1.14-.474zM7 .333a6.667 6.667 0 100 13.334A6.667 6.667 0 007 .333zm0 12A5.334 5.334 0 117 1.666a5.334 5.334 0 010 10.667zm0-8.666a2 2 0 00-1.733 1 .667.667 0 101.153.666.667.667 0 011.051-.138A.667.667 0 017 6.333.667.667 0 006.333 7v.667a.667.667 0 101.334 0v-.12A2 2 0 007 3.667z"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default Help;
