import React from 'react';

import { SVGProps } from './SVG.props';

const Box = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '17'}
      height={height || '21'}
      viewBox="0 0 17 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9908 6.51996C16.9851 6.49359 16.9851 6.46632 16.9908 6.43996C16.9859 6.41688 16.9859 6.39304 16.9908 6.36996V6.27996L16.9308 6.12996C16.9064 6.08903 16.8761 6.05196 16.8408 6.01996L16.7508 5.93996H16.7008L12.7608 3.44996L9.0408 1.14996C8.95473 1.08169 8.85625 1.03075 8.7508 0.999959H8.6708C8.58142 0.98504 8.49018 0.98504 8.4008 0.999959H8.3008C8.18464 1.02565 8.07327 1.06952 7.9708 1.12996L0.500801 5.77996L0.410801 5.84996L0.3208 5.92996L0.220801 5.99996L0.170801 6.05996L0.1108 6.20996V6.29996V6.35996C0.101087 6.42627 0.101087 6.49365 0.1108 6.55996V15.29C0.11046 15.4599 0.153437 15.6271 0.235672 15.7759C0.317907 15.9246 0.436688 16.0499 0.5808 16.14L8.0808 20.78L8.2308 20.84H8.3108C8.47998 20.8936 8.66162 20.8936 8.8308 20.84H8.9108L9.0608 20.78L16.5008 16.21C16.6449 16.1199 16.7637 15.9946 16.8459 15.8459C16.9282 15.6971 16.9711 15.5299 16.9708 15.36V6.62996C16.9708 6.62996 16.9908 6.55996 16.9908 6.51996ZM8.5008 3.16996L10.2808 4.26996L4.6908 7.72996L2.9008 6.62996L8.5008 3.16996ZM7.5008 18.17L2.0008 14.81V8.41996L7.5008 11.82V18.17ZM8.5008 10.06L6.5908 8.90996L12.1808 5.43996L14.1008 6.62996L8.5008 10.06ZM15.0008 14.78L9.5008 18.2V11.82L15.0008 8.41996V14.78Z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Box;
