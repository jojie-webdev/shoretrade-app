import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Download = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 12}
      height={height || 14}
      viewBox="0 0 12 14"
      fill="none"
      {...props}
    >
      <path
        d="M10.666 12.333H1.333a.667.667 0 100 1.334h9.334a.666.666 0 100-1.334zm-5.14-1.526c.064.06.139.108.22.14a.626.626 0 00.507 0 .666.666 0 00.22-.14L9.14 8.14a.67.67 0 00-.947-.947L6.667 8.727V1a.667.667 0 00-1.334 0v7.727L3.807 7.193a.67.67 0 00-.947.947l2.667 2.667z"
        fill={fill || '#7F8498'}
      />
    </svg>
  );
};

export default Download;
