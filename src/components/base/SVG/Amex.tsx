import React from 'react';

import { SVGProps } from './SVG.props';

const Amex = (props: SVGProps): JSX.Element => {
  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={28}
      height={24}
      // viewBox="0 0 14 14"
      fill="none"
      viewBox="0 0 291.764 291.764"
      {...props}
    >
      <path
        d="M18.235 41.025h255.294c10.066 0 18.235 8.169 18.235 18.244v173.235c0 10.066-8.169 18.235-18.235 18.235H18.235C8.16 250.74 0 242.57 0 232.505V59.269c0-10.075 8.169-18.244 18.235-18.244z"
        fill="#26a6d1"
      />
      <path
        d="M47.047 113.966l-28.812 63.76h34.492l4.276-10.166h9.774l4.276 10.166h37.966v-7.759l3.383 7.759h19.639l3.383-7.923v7.923h78.959l9.601-9.902 8.99 9.902 40.555.082-28.903-31.784 28.903-32.058h-39.926l-9.346 9.719-8.707-9.719h-85.897l-7.376 16.457-7.549-16.457h-34.42v7.495l-3.829-7.495H47.047zm6.674 9.054h16.813l19.111 43.236V123.02h18.418l14.761 31 13.604-31h18.326v45.752h-11.151l-.091-35.851-16.257 35.851h-9.975l-16.348-35.851v35.851h-22.94l-4.349-10.257H50.147l-4.34 10.248H33.516l20.205-45.743zm111.235 0h45.342L224.166 138l14.315-14.98h13.868l-21.071 22.995 21.071 22.73h-14.497l-13.868-15.154-14.388 15.154h-44.64V123.02zM61.9 130.761l-7.741 18.272h15.473L61.9 130.761zm114.253 1.732v8.352h24.736v9.309h-24.736v9.118h27.745l12.892-13.43-12.345-13.357h-28.292v.008z"
        fill="#fff"
      />
    </svg>
  );
};

export default Amex;
