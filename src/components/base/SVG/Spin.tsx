import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Spin = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 52}
      height={height || 52}
      viewBox="0 0 52 52"
      fill="none"
    >
      <circle cx={26} cy={26} r={24} stroke="#E5E9F5" strokeWidth={3} />
      <path
        d="M26 2c13.255 0 24 10.745 24 24"
        stroke={fill || '#E35D32'}
        strokeWidth={3}
        strokeMiterlimit={1.414}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spin;
