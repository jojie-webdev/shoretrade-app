import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const LogOut = (props: SVGProps): JSX.Element => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2H18ZM6.53513 4C6.19479 4.58835 6 5.27143 6 6V18C6 18.7286 6.19479 19.4117 6.53513 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H6.53513ZM10 20C8.89543 20 8 19.1046 8 18V6C8 4.89543 8.89543 4 10 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H10ZM13.0705 13.0116L13.7512 13.6923C14.1078 14.0489 14.1078 14.6272 13.7512 14.9838C13.3946 15.3404 12.8164 15.3404 12.4597 14.9838L10.1994 12.7235C9.84275 12.3668 9.84275 11.7886 10.1994 11.432L12.4597 9.17162C12.8164 8.81499 13.3946 8.81499 13.7512 9.17162C14.1078 9.52826 14.1078 10.1065 13.7512 10.4631L13.0291 11.1852H17.5008C18.0052 11.1852 18.4141 11.594 18.4141 12.0984C18.4141 12.6028 18.0052 13.0116 17.5008 13.0116H13.0705Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default LogOut;
