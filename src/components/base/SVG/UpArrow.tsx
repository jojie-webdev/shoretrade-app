import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const UpArrow = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '6'}
      height={height || '4'}
      viewBox="0 0 6 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.29271 2.79033L3.37982 0.558622C3.20011 0.348959 2.88446 0.324678 2.6748 0.504389C2.65536 0.521051 2.63723 0.539182 2.62057 0.558622L0.707678 2.79033C0.527968 2.99999 0.552248 3.31564 0.761911 3.49535C0.852532 3.57303 0.967951 3.61572 1.08731 3.61572L4.91309 3.61572C5.18923 3.61572 5.41309 3.39187 5.41309 3.11572C5.41309 2.99637 5.37039 2.88095 5.29271 2.79033Z"
        fill={fill || '#00C48C'}
      />
    </svg>
  );
};

export default UpArrow;
