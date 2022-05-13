import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Fan = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1136 9L8.09354 5.99586C7.00949 4.38367 7.81766 2.18306 9.68747 1.65568V1.65568C11.2076 1.22692 12.8167 1.22692 14.3368 1.65568V1.65568C16.2066 2.18306 17.0148 4.38367 15.9308 5.99586L13.9107 9"
        stroke={fill || theme.grey.shade7}
        strokeWidth="1.88235"
      />
      <path
        d="M9.59298 9.27296L5.97642 9.48033C4.03558 9.59162 2.77049 11.5671 3.48134 13.3765V13.3765C4.05925 14.8475 5.03273 16.1301 6.29413 17.0823V17.0823C7.84568 18.2536 10.0886 17.5665 10.7178 15.7271L11.8902 12.2995"
        stroke={fill || theme.grey.shade7}
        strokeWidth="1.88358"
      />
      <path
        d="M13.9445 9.21181L18.3525 9.47564C20.2917 9.5917 21.552 11.5689 20.8417 13.377V13.377C20.2642 14.8469 19.2909 16.1299 18.0305 17.0814V17.0814C16.4802 18.2518 14.239 17.5651 13.6103 15.7271L12.4388 12.3022"
        stroke={fill || theme.grey.shade7}
        strokeWidth="1.88213"
      />
      <path
        d="M17.5 13.0005L17.059 13.6652"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12.0268"
        cy="10.2905"
        r="2.53379"
        stroke={fill || theme.grey.shade7}
        strokeWidth="1.68919"
      />
    </svg>
  );
};

export default Fan;
