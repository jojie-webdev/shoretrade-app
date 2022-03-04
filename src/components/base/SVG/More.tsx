import React from 'react';

import { SVGProps } from './SVG.props';

const More = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '24'}
      height={height || '25'}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 15.75C5.65685 15.75 7 14.4069 7 12.75C7 11.0931 5.65685 9.75 4 9.75C2.34315 9.75 1 11.0931 1 12.75C1 14.4069 2.34315 15.75 4 15.75ZM4 13.75C4.55228 13.75 5 13.3023 5 12.75C5 12.1977 4.55228 11.75 4 11.75C3.44772 11.75 3 12.1977 3 12.75C3 13.3023 3.44772 13.75 4 13.75Z"
        fill={fill || '#565A6A'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 15.75C13.6569 15.75 15 14.4069 15 12.75C15 11.0931 13.6569 9.75 12 9.75C10.3431 9.75 9 11.0931 9 12.75C9 14.4069 10.3431 15.75 12 15.75ZM12 13.75C12.5523 13.75 13 13.3023 13 12.75C13 12.1977 12.5523 11.75 12 11.75C11.4477 11.75 11 12.1977 11 12.75C11 13.3023 11.4477 13.75 12 13.75Z"
        fill={fill || '#565A6A'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 12.75C23 14.4069 21.6569 15.75 20 15.75C18.3431 15.75 17 14.4069 17 12.75C17 11.0931 18.3431 9.75 20 9.75C21.6569 9.75 23 11.0931 23 12.75ZM21 12.75C21 13.3023 20.5523 13.75 20 13.75C19.4477 13.75 19 13.3023 19 12.75C19 12.1977 19.4477 11.75 20 11.75C20.5523 11.75 21 12.1977 21 12.75Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default More;
