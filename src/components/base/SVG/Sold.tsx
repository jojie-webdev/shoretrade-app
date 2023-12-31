import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Sold = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fill || theme.grey.shade7}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2038 11.7071L17.0038 6.90703C17.3943 6.5165 17.3943 5.88334 17.0038 5.49282C16.6133 5.10229 15.9801 5.1023 15.5896 5.49282L11.4967 9.58573L9.20383 7.29285C8.81331 6.90232 8.18014 6.90232 7.78962 7.29285C7.39909 7.68337 7.39909 8.31654 7.78962 8.70706L10.7896 11.7071C10.9772 11.8946 11.2315 12 11.4967 12C11.7619 12 12.0163 11.8946 12.2038 11.7071Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9961 2C20.2052 2 21.9961 3.79086 21.9961 6L21.9961 18C21.9961 20.2091 20.2052 22 17.9961 22L5.99609 22C3.78695 22 1.99609 20.2091 1.99609 18L1.99609 6C1.99609 3.79086 3.78696 2 5.99609 2L17.9961 2ZM19.9961 6V12.0021C19.995 13.1057 19.1 14 17.9961 14H5.99609C4.89153 14 3.99609 13.1046 3.99609 12L3.99609 6C3.99609 4.89543 4.89153 4 5.99609 4L17.9961 4C19.1007 4 19.9961 4.89543 19.9961 6ZM17.9961 16C18.7247 16 19.4077 15.8052 19.9961 15.4649V18C19.9961 19.1046 19.1007 20 17.9961 20H5.99609C4.89152 20 3.99609 19.1046 3.99609 18V15.4649C4.58444 15.8052 5.26752 16 5.99609 16L17.9961 16Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default Sold;
