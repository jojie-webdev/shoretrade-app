import React from 'react';

import { SVGProps } from './SVG.props';

const CheckList = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 18}
      height={height || 18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M14.833 2.334h-1.208a2.567 2.567 0 00-.458-.834 2.5 2.5 0 00-1.875-.833H6.725a2.5 2.5 0 00-1.892.833c-.209.246-.37.529-.475.834H3.167a2.5 2.5 0 00-2.5 2.5v10a2.5 2.5 0 002.5 2.5h11.666a2.5 2.5 0 002.5-2.5v-10a2.5 2.5 0 00-2.5-2.5zM6.1 2.617a.833.833 0 01.625-.283h4.55a.833.833 0 01.625.283.834.834 0 01.208.65L11.692 6.6a.833.833 0 01-.834.734H9.492l.95-2a.833.833 0 00-1.5-.717l-1.3 2.717h-.5a.833.833 0 01-.834-.734l-.416-3.333a.833.833 0 01.208-.65zm9.567 12.217a.833.833 0 01-.834.833H3.167a.833.833 0 01-.834-.833v-10A.833.833 0 013.167 4h1.141l.35 2.809A2.5 2.5 0 007.158 9h3.717a2.5 2.5 0 002.5-2.191L13.692 4h1.141a.833.833 0 01.834.834v10zm-5-2.5H7.333a.833.833 0 100 1.667h3.334a.833.833 0 000-1.667z"
        fill={fill || '#fff'}
      />
    </svg>
  );
};

export default CheckList;
