import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const DashboardOutlined = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill={fill || '#565A6A'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 11.75C2 10.2312 3.23122 9 4.75 9C6.26878 9 7.5 10.2312 7.5 11.75V15.25C7.5 16.7688 6.26878 18 4.75 18C3.23122 18 2 16.7688 2 15.25V11.75ZM4.75 11C4.33579 11 4 11.3358 4 11.75V15.25C4 15.6642 4.33579 16 4.75 16C5.16421 16 5.5 15.6642 5.5 15.25V11.75C5.5 11.3358 5.16421 11 4.75 11Z"
        fill={fill || '#565A6A'}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9 5.75C9 4.23122 10.2312 3 11.75 3C13.2688 3 14.5 4.23122 14.5 5.75V15.25C14.5 16.7688 13.2688 18 11.75 18C10.2312 18 9 16.7688 9 15.25V5.75ZM11.75 5C11.3358 5 11 5.33579 11 5.75V15.25C11 15.6642 11.3358 16 11.75 16C12.1642 16 12.5 15.6642 12.5 15.25V5.75C12.5 5.33579 12.1642 5 11.75 5Z"
        fill={fill || '#565A6A'}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16 13.75C16 12.2312 17.2312 11 18.75 11C20.2688 11 21.5 12.2312 21.5 13.75V15.25C21.5 16.7688 20.2688 18 18.75 18C17.2312 18 16 16.7688 16 15.25V13.75ZM18.75 13C18.3358 13 18 13.3358 18 13.75V15.25C18 15.6642 18.3358 16 18.75 16C19.1642 16 19.5 15.6642 19.5 15.25V13.75C19.5 13.3358 19.1642 13 18.75 13Z"
        fill={fill || '#565A6A'}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default DashboardOutlined;
