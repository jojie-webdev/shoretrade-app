import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const DropdownArrow = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={width || 8} height={height || 6} viewBox="0 0 8 6" fill="none">
      <path
        d="M.561 1.814l2.87 3.348a.75.75 0 001.139 0l2.869-3.348a.75.75 0 00-.57-1.238H1.132a.75.75 0 00-.57 1.238z"
        fill={fill || '#111E2B'}
      />
    </svg>
  );
};

export default DropdownArrow;
