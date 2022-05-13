import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const BoxOutline = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1963 12.5H9C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5L15.1963 14.5C15.7486 14.5 16.1963 14.0523 16.1963 13.5C16.1963 12.9477 15.7486 12.5 15.1963 12.5Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 3C20.2091 3 22 4.79086 22 7V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V7C2 4.79086 3.79086 3 6 3H18ZM20 18V10.4649C19.4117 10.8052 18.7286 11 18 11L6 11C5.27143 11 4.58835 10.8052 4 10.4649V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18ZM6 9C4.89566 9 4.00038 8.10495 4 7.0007C4 5.89613 4.89543 5 6 5L18 5C19.1046 5 20 5.89543 20 7C20 8.10457 19.1046 9 18 9L6 9Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default BoxOutline;
