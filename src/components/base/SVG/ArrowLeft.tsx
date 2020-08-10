import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const ArrowLeft = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '12'}
      height={height || '12'}
      viewBox="0 0 12 12"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.668443 5.74735C0.601091 5.91038 0.601091 6.09345 0.668443 6.25647C0.700961 6.3373 0.749007 6.41097 0.809864 6.47332L5.52391 11.1874C5.64893 11.3124 5.8185 11.3826 5.99531 11.3826C6.17212 11.3826 6.34169 11.3124 6.46672 11.1874C6.59174 11.0623 6.66198 10.8928 6.66198 10.716C6.66198 10.5391 6.59174 10.3696 6.46672 10.2446L2.88876 6.66659L10.7094 6.67131C10.7974 6.67167 10.8846 6.6546 10.966 6.62109C11.0473 6.58757 11.1213 6.53828 11.1835 6.47605C11.2457 6.41382 11.295 6.33988 11.3285 6.2585C11.362 6.17713 11.3791 6.08992 11.3788 6.00191C11.3791 5.9139 11.362 5.8267 11.3285 5.74532C11.295 5.66394 11.2457 5.59 11.1835 5.52777C11.1213 5.46554 11.0473 5.41625 10.966 5.38274C10.8846 5.34922 10.7974 5.33216 10.7094 5.33252L2.88876 5.33723L6.46672 1.75927C6.59174 1.63425 6.66198 1.46468 6.66198 1.28787C6.66198 1.11106 6.59174 0.941486 6.46672 0.816462C6.34169 0.691437 6.17212 0.621198 5.99531 0.621199C5.8185 0.621199 5.64893 0.691437 5.52391 0.816461L0.809864 5.53051C0.749007 5.59285 0.700961 5.66652 0.668443 5.74735Z"
        fill={fill || '#111E2B'}
      />
    </svg>
  );
};

export default ArrowLeft;
