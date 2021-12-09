import React from 'react';

import { SVGProps } from './SVG.props';

const Crates = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 18}
      height={height || 17}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 .5a3.333 3.333 0 013.333 3.333V13A3.333 3.333 0 0114 16.333H4A3.333 3.333 0 01.667 13V3.833A3.333 3.333 0 014 .5h10zm-10 5a1.667 1.667 0 110-3.333h10A1.667 1.667 0 1114 5.5H4zm7.664 2.917H6.5a.833.833 0 100 1.666h5.164a.833.833 0 100-1.666z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Crates;
