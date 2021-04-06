import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const ChevronDown = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={width || 8} height={height || 6} viewBox="0 0 8 6" fill="none">
      <path
        d="M0.561418 1.81437L3.43078 5.16189C3.70035 5.47638 4.17382 5.5128 4.48832 5.24324C4.51748 5.21824 4.54468 5.19105 4.56967 5.16189L7.43903 1.81437C7.7086 1.49988 7.67218 1.02641 7.35768 0.756849C7.22175 0.640337 7.04862 0.576294 6.86958 0.576294L1.13087 0.576294C0.716648 0.576294 0.380859 0.912076 0.380859 1.32628C0.380859 1.50532 0.444904 1.67844 0.561418 1.81437Z"
        fill={fill || '#5487F5'}
      />
    </svg>
  );
};

export default ChevronDown;
