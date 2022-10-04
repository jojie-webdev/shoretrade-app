import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const BulletList = (props: SVGProps): JSX.Element => {
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
      <rect
        width="18"
        height="18"
        rx="3"
        transform="matrix(1 0 0 -1 3 21)"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.5L11 16.5"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.69922 16.4C5.69922 17.1732 6.32602 17.8 7.09922 17.8C7.87242 17.8 8.49922 17.1732 8.49922 16.4C8.49922 15.6269 7.87242 15 7.09922 15C6.32602 15 5.69922 15.6269 5.69922 16.4Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M17 12L11 12"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.69922 11.9C5.69922 12.6732 6.32602 13.3 7.09922 13.3C7.87242 13.3 8.49922 12.6732 8.49922 11.9C8.49922 11.1268 7.87242 10.5 7.09922 10.5C6.32602 10.5 5.69922 11.1268 5.69922 11.9Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M17 7.5L11 7.5"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.69922 7.6C5.69922 8.3732 6.32602 9 7.09922 9C7.87242 9 8.49922 8.3732 8.49922 7.6C8.49922 6.8268 7.87242 6.2 7.09922 6.2C6.32602 6.2 5.69922 6.8268 5.69922 7.6Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default BulletList;
