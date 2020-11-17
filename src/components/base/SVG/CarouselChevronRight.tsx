import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const CarouselChevronRight = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 12}
      height={height || 20}
      viewBox="0 0 12 20"
      fill="none"
    >
      <path
        d="M1.047 1.25a1.75 1.75 0 000 2.468L7.242 10l-6.195 6.195a1.75 1.75 0 102.485 2.468l7.42-7.42a1.75 1.75 0 000-2.485L3.533 1.25a1.75 1.75 0 00-2.485 0z"
        fill={fill || '#111E2B'}
      />
    </svg>
  );
};

export default React.memo(CarouselChevronRight);
