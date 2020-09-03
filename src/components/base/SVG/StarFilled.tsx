import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const StarFilled = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 14}
      height={height || 14}
      viewBox="0 0 14 14"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.446 5.138c.102.08.179.187.22.309a.667.667 0 01-.213.68L10.7 8.793l.667 3.787a.667.667 0 01-.967.713L7 11.507l-3.413 1.78a.668.668 0 01-.967-.714l.667-3.786L.533 6.12a.667.667 0 01-.166-.667A.667.667 0 01.907 5L4.7 4.44 6.4 1a.667.667 0 011.2 0l1.7 3.447L13.093 5c.129.011.252.06.353.138z"
        fill={props.fill || theme.grey.shade9}
      />
    </svg>
  );
};

export default StarFilled;
