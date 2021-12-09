import React from 'react';

import { SVGProps } from './SVG.props';

const Mastercard = (props: SVGProps): JSX.Element => {
  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={21} height={13} viewBox="0 0 21 13" fill="none" {...props}>
      <path d="M13.205 1.314H7.766v9.669h5.44V1.314z" fill="#FF5F00" />
      <path
        d="M8.111 6.15a6.114 6.114 0 012.375-4.834C7.937-.664 4.277-.376 2.078 1.98a6.1 6.1 0 000 8.343c2.199 2.355 5.859 2.644 8.408.663A6.114 6.114 0 018.11 6.15z"
        fill="#EB001B"
      />
      <path
        d="M20.544 6.15a6.143 6.143 0 01-3.5 5.53 6.272 6.272 0 01-6.558-.697A6.124 6.124 0 0012.86 6.15a6.124 6.124 0 00-2.375-4.834 6.272 6.272 0 016.558-.697 6.143 6.143 0 013.5 5.53v.002z"
        fill="#F79E1B"
      />
    </svg>
  );
};

export default Mastercard;
