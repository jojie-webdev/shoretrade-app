import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const CreditCardOutline = (props: SVGProps): JSX.Element => {
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
        d="M17 10C17.5523 10 18 9.55229 18 9C18 8.44772 17.5523 8 17 8H13C12.4477 8 12 8.44772 12 9C12 9.55229 12.4477 10 13 10H17Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 4C20.2091 4 22 5.79086 22 8V17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V8C2 5.79086 3.79086 4 6 4H18ZM20 8V14H4L4 8C4 6.89543 4.89543 6 6 6L18 6C19.1046 6 20 6.89543 20 8ZM20 17V16H4V17C4 18.1046 4.89543 19 6 19L18 19C19.1046 19 20 18.1046 20 17Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default CreditCardOutline;
