import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Anchor = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 7.82929C14.1652 7.41746 15 6.30622 15 5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5C9 6.30622 9.83481 7.41746 11 7.82929V10H9C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H11L11 19.917C8.4875 19.4955 6.50448 17.5125 6.08296 15H7C7.55228 15 8 14.5523 8 14C8 13.4477 7.55228 13 7 13H5C4.44772 13 4 13.4477 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 13.4477 19.5523 13 19 13H17C16.4477 13 16 13.4477 16 14C16 14.5523 16.4477 15 17 15H17.917C17.4955 17.5125 15.5125 19.4955 13 19.917L13 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H13V7.82929ZM11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5C13 5.55228 12.5523 6 12 6C11.4477 6 11 5.55228 11 5Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default Anchor;
