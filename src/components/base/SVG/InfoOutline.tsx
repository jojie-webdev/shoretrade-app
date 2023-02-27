import React from 'react';

import { SVGProps } from './SVG.props';

const InfoOutline = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || '28'}
      height={height || '28'}
      viewBox="0 0 14 14"
      fill={fill || 'none'}
    >
      <path
        d="M7 6.3a.7.7 0 0 0-.7.7v2.8a.7.7 0 0 0 1.4 0V7a.7.7 0 0 0-.7-.7Zm.266-2.744a.7.7 0 0 0-.532 0 .7.7 0 0 0-.231.147.805.805 0 0 0-.147.231.7.7 0 0 0 .147.763.805.805 0 0 0 .231.147A.7.7 0 0 0 7.7 4.2a.735.735 0 0 0-.203-.497.7.7 0 0 0-.231-.147ZM7 0a7 7 0 1 0 0 14A7 7 0 0 0 7 0Zm0 12.6A5.6 5.6 0 1 1 7 1.401 5.6 5.6 0 0 1 7 12.6Z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default InfoOutline;
