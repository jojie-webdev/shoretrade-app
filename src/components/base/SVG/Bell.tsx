import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Bell = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.33366 8.33366C3.33366 4.65176 6.31843 1.66699 10.0003 1.66699C13.6822 1.66699 16.667 4.65176 16.667 8.33366V14.167H17.5003C17.9606 14.167 18.3337 14.5401 18.3337 15.0003C18.3337 15.4606 17.9606 15.8337 17.5003 15.8337H12.917C12.917 17.4445 11.6112 18.7503 10.0003 18.7503C8.3895 18.7503 7.08366 17.4445 7.08366 15.8337H2.50033C2.04009 15.8337 1.66699 15.4606 1.66699 15.0003C1.66699 14.5401 2.04009 14.167 2.50033 14.167H3.33366V8.33366ZM5.00033 14.167H15.0003V8.33366C15.0003 5.57224 12.7617 3.33366 10.0003 3.33366C7.2389 3.33366 5.00033 5.57224 5.00033 8.33366V14.167ZM8.75033 15.8337C8.75033 16.524 9.30997 17.0837 10.0003 17.0837C10.6907 17.0837 11.2503 16.524 11.2503 15.8337H8.75033Z"
        fill={fill || '#09131D'}
      />
    </svg>
  );
};

export default Bell;
