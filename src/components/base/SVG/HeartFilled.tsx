import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const HeartFilled = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={21} height={18} viewBox="0 0 21 18" fill="none" {...props}>
      <path
        d="M19.16 2A6.29 6.29 0 0011 1.36a6.27 6.27 0 00-8.16 9.48l6.21 6.22a2.78 2.78 0 003.9 0l6.21-6.22a6.27 6.27 0 000-8.84z"
        fill={props.fill || theme.brand.error}
      />
    </svg>
  )
};

export default HeartFilled;
