import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Home2 = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8.90754V17C1 18.1046 1.89543 19 3 19H15C16.1046 19 17 18.1046 17 17V8.90754C17 8.33081 16.751 7.78216 16.317 7.40238L10.317 2.15238C9.56296 1.49259 8.43704 1.49259 7.68299 2.15238L1.68299 7.40238C1.24896 7.78216 1 8.33081 1 8.90754Z"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="12"
        r="3"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
      />
    </svg>
  );
};

export default Home2;
