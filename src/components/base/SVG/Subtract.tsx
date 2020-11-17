import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Subtract = (props: SVGProps & { innerFill?: string }): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill, innerFill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={height || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" fill={innerFill || 'white'} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.44381 3.6853C8.08831 2.58649 10.0217 2 11.9995 2C13.3127 2 14.6131 2.25866 15.8264 2.7612C17.0396 3.26375 18.142 4.00035 19.0706 4.92893C19.9992 5.85752 20.7358 6.95991 21.2383 8.17317C21.7409 9.38642 21.9995 10.6868 21.9995 12C21.9995 13.9778 21.413 15.9112 20.3142 17.5557C19.2154 19.2002 17.6536 20.4819 15.8264 21.2388C13.9991 21.9957 11.9884 22.1937 10.0486 21.8079C8.1088 21.422 6.32697 20.4696 4.92845 19.0711C3.52992 17.6725 2.57752 15.8907 2.19166 13.9509C1.80581 12.0111 2.00384 10.0004 2.76072 8.17317C3.5176 6.3459 4.79932 4.78412 6.44381 3.6853ZM15.999 11H7.99902C7.73381 11 7.47945 11.1054 7.29192 11.2929C7.10438 11.4804 6.99902 11.7348 6.99902 12C6.99902 12.2652 7.10438 12.5196 7.29192 12.7071C7.47945 12.8946 7.73381 13 7.99902 13H15.999C16.2642 13 16.5186 12.8946 16.7061 12.7071C16.8937 12.5196 16.999 12.2652 16.999 12C16.999 11.7348 16.8937 11.4804 16.7061 11.2929C16.5186 11.1054 16.2642 11 15.999 11Z"
        fill={fill || '#F23742'}
      />
    </svg>
  );
};

export default Subtract;
