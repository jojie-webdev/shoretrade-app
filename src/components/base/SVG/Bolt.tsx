import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Bolt = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '17'}
      height={height || '21'}
      viewBox="0 0 14 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5746 6.95841C13.5054 6.82098 13.3994 6.70541 13.2685 6.62451C13.1376 6.54361 12.9869 6.50054 12.833 6.50008H8.6663V1.50008C8.67525 1.31731 8.62379 1.13669 8.51987 0.986077C8.41595 0.835467 8.26534 0.723249 8.0913 0.666743C7.92399 0.611696 7.74354 0.611077 7.57586 0.664976C7.40817 0.718875 7.26187 0.824519 7.15797 0.966743L0.491303 10.1334C0.407775 10.2541 0.357619 10.3948 0.345912 10.5411C0.334205 10.6874 0.361363 10.8343 0.424637 10.9667C0.482905 11.1182 0.584127 11.2493 0.715878 11.3441C0.847629 11.4388 1.00418 11.493 1.1663 11.5001H5.33297V16.5001C5.3331 16.6758 5.38878 16.847 5.49205 16.9892C5.59532 17.1314 5.7409 17.2373 5.90797 17.2917C5.9917 17.3177 6.07866 17.3317 6.1663 17.3334C6.29779 17.3337 6.42749 17.303 6.54481 17.2436C6.66213 17.1842 6.76373 17.0979 6.8413 16.9917L13.508 7.82508C13.5978 7.70074 13.6515 7.55404 13.6633 7.40112C13.675 7.24821 13.6444 7.09501 13.5746 6.95841ZM6.99964 13.9334V10.6667C6.99964 10.4457 6.91184 10.2338 6.75556 10.0775C6.59928 9.92121 6.38732 9.83341 6.1663 9.83341H2.83297L6.99964 4.06674V7.33341C6.99964 7.55442 7.08743 7.76638 7.24371 7.92266C7.4 8.07894 7.61196 8.16674 7.83297 8.16674H11.1663L6.99964 13.9334Z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Bolt;