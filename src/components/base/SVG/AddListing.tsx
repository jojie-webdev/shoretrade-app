import React from 'react';

import { SVGProps } from './SVG.props';

const AddListing = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      {...props}
      width={width || 85}
      height={height || 85}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.25 26a4.125 4.125 0 014.125 4.125v8.25h8.25a4.125 4.125 0 110 8.25h-8.25v8.25a4.125 4.125 0 11-8.25 0v-8.25h-8.25a4.125 4.125 0 110-8.25h8.25v-8.25A4.125 4.125 0 0134.25 26z"
        fill={fill || '#111E2B'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.75 1.25c-9.113 0-16.5 7.387-16.5 16.5v49.5c0 9.113 7.387 16.5 16.5 16.5h49.5c9.113 0 16.5-7.387 16.5-16.5v-49.5c0-9.113-7.387-16.5-16.5-16.5h-49.5zM65.043 9.5h2.207a8.25 8.25 0 018.25 8.25v49.5a8.25 8.25 0 01-8.25 8.25h-2.207a16.424 16.424 0 002.207-8.25v-49.5c0-3.005-.803-5.823-2.207-8.25zm-14.293 66A8.25 8.25 0 0059 67.25v-49.5a8.25 8.25 0 00-8.25-8.25h-33a8.25 8.25 0 00-8.25 8.25v49.5a8.25 8.25 0 008.25 8.25h33z"
        fill={fill || '#111E2B'}
      />
      <path
        d="M34.25 26a4.125 4.125 0 014.125 4.125v8.25h8.25a4.125 4.125 0 110 8.25h-8.25v8.25a4.125 4.125 0 11-8.25 0v-8.25h-8.25a4.125 4.125 0 110-8.25h8.25v-8.25A4.125 4.125 0 0134.25 26z"
        stroke={'transparent'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        clipRule="evenodd"
        d="M17.75 1.25c-9.113 0-16.5 7.387-16.5 16.5v49.5c0 9.113 7.387 16.5 16.5 16.5h49.5c9.113 0 16.5-7.387 16.5-16.5v-49.5c0-9.113-7.387-16.5-16.5-16.5h-49.5zM65.043 9.5h2.207a8.25 8.25 0 018.25 8.25v49.5a8.25 8.25 0 01-8.25 8.25h-2.207a16.424 16.424 0 002.207-8.25v-49.5c0-3.005-.803-5.823-2.207-8.25zm-14.293 66A8.25 8.25 0 0059 67.25v-49.5a8.25 8.25 0 00-8.25-8.25h-33a8.25 8.25 0 00-8.25 8.25v49.5a8.25 8.25 0 008.25 8.25h33z"
        stroke={'transparent'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default AddListing;
