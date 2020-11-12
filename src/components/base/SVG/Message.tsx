import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Message = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 18}
      height={height || 10}
      viewBox="0 0 18 10"
      fill="none"
      {...props}
    >
      <path
        d="M2.992 3.75H1.325a.833.833 0 000 1.666h1.667a.833.833 0 000-1.666zm13.983-2.367v-.05A2.5 2.5 0 0015 .416H8.392a2.5 2.5 0 00-1.667.617c-.43.38-.714.899-.8 1.467l-.733 4.166A2.5 2.5 0 007.65 9.6h6.617a2.5 2.5 0 002.5-2.067l.733-4.167a2.5 2.5 0 00-.525-1.983zm-2.283.7l-2.834 2.3a.834.834 0 01-1.15-.1l-1.941-2.2h5.925zm.4 5.142a.833.833 0 01-.834.691H7.65a.833.833 0 01-.817-.975L7.5 3.166l1.958 2.217a2.5 2.5 0 003.45.292l2.867-2.342-.683 3.892zM3.825.416h-2.5a.833.833 0 000 1.667h2.5a.833.833 0 100-1.667z"
        fill={fill || '#09131D'}
      />
    </svg>
  );
};

export default Message;
