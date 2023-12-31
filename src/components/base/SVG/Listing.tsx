import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Listing = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 18}
      height={height || 18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16984 8.75669L13.1698 4.75667C13.4953 4.43123 13.4953 3.9036 13.1698 3.57816C12.8444 3.25273 12.3167 3.25273 11.9913 3.57817L8.58058 6.98893L6.66984 5.07819C6.3444 4.75275 5.81676 4.75275 5.49133 5.07819C5.16589 5.40362 5.16589 5.93126 5.49133 6.2567L7.99133 8.7567C8.14761 8.91298 8.35957 9.00077 8.58058 9.00077C8.8016 9.00077 9.01356 8.91298 9.16984 8.75669Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9967 0.667482C15.8377 0.667481 17.3301 2.15987 17.3301 4.00081L17.3301 14.0008C17.3301 15.8418 15.8377 17.3341 13.9967 17.3341H3.99672C2.15578 17.3341 0.663391 15.8418 0.663391 14.0008L0.663391 4.00081C0.663391 2.15986 2.15578 0.66748 3.99672 0.66748L13.9967 0.667482ZM15.6634 4.00081V9.00082C15.6634 9.92129 14.9172 10.6675 13.9967 10.6675H3.99672C3.07625 10.6675 2.33006 9.92129 2.33006 9.00081L2.33006 4.00081C2.33006 3.08034 3.07625 2.33415 3.99672 2.33415L13.9967 2.33415C14.9172 2.33415 15.6634 3.08034 15.6634 4.00081Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default Listing;
