import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Star = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 14}
      height={height || 14}
      viewBox="0 0 14 14"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.667 5.447A.667.667 0 0013.093 5L9.3 4.447 7.6 1a.667.667 0 00-1.2 0L4.7 4.44.907 5a.667.667 0 00-.54.453.667.667 0 00.166.667l2.754 2.667-.667 3.786a.667.667 0 00.967.714L7 11.507l3.4 1.786c.094.053.2.08.307.08a.667.667 0 00.624-.42.667.667 0 00.036-.373L10.7 8.793l2.753-2.666a.667.667 0 00.214-.68zm-4.1 2.666a.667.667 0 00-.194.594l.48 2.793-2.506-1.333a.666.666 0 00-.627 0L4.213 11.5l.48-2.793a.667.667 0 00-.193-.594l-2-2 2.807-.406a.667.667 0 00.506-.367L7 2.8l1.253 2.547a.667.667 0 00.507.366l2.807.407-2 1.993z"
        fill={props.fill || theme.grey.shade5}
      />
    </svg>
  )
};

export default Star;
