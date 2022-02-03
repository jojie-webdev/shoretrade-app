import React from 'react';

import { SVGProps } from './SVG.props';

const GooglePlay = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '23'}
      height={height || '24'}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.51459 0.958703L12.911 12.3323L1.5693 23.8056C1.23833 23.5954 1.0609 23.1402 1.0579 22.5522C1.0522 21.4245 0.96191 3.53151 0.95511 2.18884C0.951947 1.54493 1.1863 1.15216 1.51459 0.958703ZM16.669 8.53076L2.81097 0.974034C2.66296 0.893268 2.49486 0.844113 2.3274 0.822144L13.3824 11.8553L16.669 8.53076ZM17.2853 15.7503L13.8571 12.329L17.2818 8.86488L21.998 11.4363C23.1598 12.0694 22.5655 12.8616 21.998 13.172L17.2853 15.7503ZM2.50878 23.8087C2.6054 23.7724 2.70628 23.7265 2.81097 23.6681L16.6719 16.0856L13.3857 12.806L2.50878 23.8087Z"
        fill="white"
      />
    </svg>
  );
};

export default GooglePlay;
