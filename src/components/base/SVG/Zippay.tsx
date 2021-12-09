import React from 'react';

import { SVGProps } from './SVG.props';

const Zippay = (props: SVGProps): JSX.Element => {
  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={14} height={12} viewBox="0 0 14 12" fill="none" {...props}>
      <path
        d="M12.809 4.462l-2.7 2.422H3.423c-.624-.001-1.226.225-1.694.637l3.373-3.026.051-.045L9.378.656a2.57 2.57 0 012.51-.53 2.553 2.553 0 01.921 4.333v.003z"
        fill="#F15B41"
      />
      <path
        d="M3.422 5.12a2.562 2.562 0 002.566-2.558A2.562 2.562 0 003.422.004 2.562 2.562 0 00.857 2.562 2.562 2.562 0 003.423 5.12z"
        fill="#F99D1D"
      />
      <path
        d="M3.422 6.883c-.623-.001-1.226.226-1.693.637l-.022.02a2.553 2.553 0 00-.192 3.612 2.57 2.57 0 003.622.191l4.972-4.46H3.422z"
        fill="#272560"
      />
      <path
        d="M10.105 6.885l-4.972 4.46a2.559 2.559 0 01-1.716.653h7.671c1.48-.023 2.525-1.133 2.525-2.558a2.544 2.544 0 00-2.525-2.557l-.983.002z"
        fill="#00B6BD"
      />
    </svg>
  );
};

export default Zippay;
