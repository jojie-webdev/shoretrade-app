import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Crate = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7928 20.9561L2.79283 19.0502C2.33064 18.9524 2 18.5444 2 18.0719V5.92806C2 5.45562 2.33064 5.04763 2.79283 4.94975L11.7928 3.04387C11.9294 3.01494 12.0706 3.01494 12.2072 3.04387L21.2072 4.94975C21.6694 5.04763 22 5.45562 22 5.92806V18.0719C22 18.5444 21.6694 18.9524 21.2072 19.0502L12.2072 20.9561C12.0706 20.9851 11.9294 20.9851 11.7928 20.9561Z"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
      />
      <path
        d="M2.75449 4.53293C2.22039 4.39237 1.67348 4.71141 1.53293 5.24551C1.39237 5.77961 1.71141 6.32652 2.24551 6.46707L2.75449 4.53293ZM21.7545 6.46707C22.2886 6.32652 22.6076 5.77961 22.4671 5.24551C22.3265 4.71141 21.7796 4.39237 21.2455 4.53293L21.7545 6.46707ZM11.7455 7.93303L11.491 8.9001L11.7455 7.93303ZM12.2545 7.93303L12 6.96595L12.2545 7.93303ZM2.24551 6.46707L11.491 8.9001L12 6.96595L2.75449 4.53293L2.24551 6.46707ZM12.509 8.9001L21.7545 6.46707L21.2455 4.53293L12 6.96595L12.509 8.9001ZM11.491 8.9001C11.8247 8.9879 12.1753 8.9879 12.509 8.9001L12 6.96595L12 6.96595L11.491 8.9001Z"
        fill={fill || theme.grey.shade7}
      />
      <path d="M12 8V21" stroke={fill || theme.grey.shade7} strokeWidth="2" />
      <path
        d="M22 6L12 21"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
      />
      <path
        d="M12 8L22 18"
        stroke={fill || theme.grey.shade7}
        strokeWidth="2"
      />
    </svg>
  );
};

export default Crate;
