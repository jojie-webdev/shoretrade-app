import React from 'react';

import { SVGProps } from './SVG.props';

const Barcode = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '18'}
      height={height || '18'}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666687 14C0.666687 15.841 2.15907 17.3334 4.00002 17.3334H14C15.841 17.3334 17.3334 15.841 17.3334 14V4.00004C17.3334 2.15909 15.841 0.666706 14 0.666706H4.00002C2.15907 0.666706 0.666687 2.15909 0.666687 4.00004V14ZM3.74937 5.33333C3.74937 4.689 4.2717 4.16667 4.91604 4.16667C5.56037 4.16667 6.0827 4.689 6.0827 5.33333C6.0827 5.97766 5.56037 6.5 4.91604 6.5C4.2717 6.5 3.74937 5.97766 3.74937 5.33333ZM14 5.25004C14 5.71028 13.6269 6.08337 13.1667 6.08337H8.16669C7.70645 6.08337 7.33335 5.71028 7.33335 5.25004C7.33335 4.7898 7.70645 4.41671 8.16669 4.41671H13.1667C13.6269 4.41671 14 4.7898 14 5.25004ZM13.1667 9.83337C13.6269 9.83337 14 9.46028 14 9.00004C14 8.5398 13.6269 8.16671 13.1667 8.16671H8.16669C7.70645 8.16671 7.33335 8.5398 7.33335 9.00004C7.33335 9.46028 7.70645 9.83337 8.16669 9.83337H13.1667ZM3.74937 9.08333C3.74937 8.439 4.2717 7.91667 4.91604 7.91667C5.56037 7.91667 6.0827 8.439 6.0827 9.08333C6.0827 9.72767 5.56037 10.25 4.91604 10.25C4.2717 10.25 3.74937 9.72767 3.74937 9.08333ZM13.1667 13.5834C13.6269 13.5834 14 13.2103 14 12.75C14 12.2898 13.6269 11.9167 13.1667 11.9167H8.16669C7.70645 11.9167 7.33335 12.2898 7.33335 12.75C7.33335 13.2103 7.70645 13.5834 8.16669 13.5834H13.1667ZM3.74937 12.6667C3.74937 12.0224 4.2717 11.5 4.91604 11.5C5.56037 11.5 6.0827 12.0224 6.0827 12.6667C6.0827 13.311 5.56037 13.8334 4.91604 13.8334C4.2717 13.8334 3.74937 13.311 3.74937 12.6667Z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Barcode;