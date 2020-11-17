import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Clock = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M10 0a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a1 1 0 00-1 1v3.27l-1.1-.64a1.003 1.003 0 10-1 1.74l2.6 1.5h.16A1 1 0 0010 11a.998.998 0 00.34-.07h.08a.92.92 0 00.28-.19 1.57 1.57 0 00.15-.19v-.06c.024-.058.045-.119.06-.18a1.42 1.42 0 000-.2V5A1 1 0 0010 4z"
        fill={fill || '#7F8498'}
      />
    </svg>
  );
};

export default Clock;
