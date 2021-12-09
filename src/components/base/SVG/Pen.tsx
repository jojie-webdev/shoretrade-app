import React from 'react';

import { SVGProps } from './SVG.props';

const Pen = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 21}
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M20 5.24a.999.999 0 00-.29-.71L15.47.29a.999.999 0 00-.71-.29 1 1 0 00-.71.29l-2.83 2.83L.29 14.05a1.001 1.001 0 00-.29.71V19a1 1 0 001 1h4.24a1.001 1.001 0 00.76-.29L16.87 8.78 19.71 6c.091-.097.166-.208.22-.33.01-.08.01-.16 0-.24a.697.697 0 000-.14l.07-.05zM4.83 18H2v-2.83l9.93-9.93 2.83 2.83L4.83 18zM16.17 6.66l-2.83-2.83 1.42-1.41 2.82 2.82-1.41 1.42z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Pen;
