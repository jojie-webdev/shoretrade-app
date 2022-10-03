import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Home3 = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10.9075V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V10.9075C20 10.3308 19.751 9.78216 19.317 9.40238L13.317 4.15238C12.563 3.49259 11.437 3.49259 10.683 4.15238L4.68299 9.40238C4.24896 9.78216 4 10.3308 4 10.9075Z"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="14"
        r="3"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
      />
    </svg>
  );
};

export default Home3;
