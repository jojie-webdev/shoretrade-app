import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const CarouselChevronLeft = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill} = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg {...props} width={width || 12} height={height || 20} viewBox="0 0 12 20" fill="none">
        <path
        d="M8.468 1.25l-7.42 7.508a1.75 1.75 0 000 2.485l7.42 7.42a1.75 1.75 0 002.993-1.234 1.75 1.75 0 00-.508-1.234L4.758 10l6.195-6.195a1.75 1.75 0 000-2.467 1.751 1.751 0 00-2.485-.088z"
        fill={fill || "#111E2B"}
        />
  </svg>
  );
};

export default React.memo(CarouselChevronLeft);
