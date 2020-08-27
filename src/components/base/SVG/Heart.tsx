import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Heart = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={width || 21} height={height || 18} fill="none" {...props}>
      <path
        d="M19.16 2A6.29 6.29 0 0011 1.36a6.27 6.27 0 00-8.16 9.48l6.21 6.22a2.78 2.78 0 003.9 0l6.21-6.22a6.27 6.27 0 000-8.84zm-1.41 7.46l-6.21 6.21a.76.76 0 01-1.08 0L4.25 9.43a4.29 4.29 0 010-6 4.27 4.27 0 016 0 .999.999 0 001.42 0 4.27 4.27 0 016 0 4.29 4.29 0 01.08 6v.03z"
        fill={props.fill || theme.grey.shade6}
      />
    </svg>
  )
};

export default Heart;
