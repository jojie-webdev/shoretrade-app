import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Expand = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  return (
    <svg width={width || 25} height={height || 16} viewBox="0 0 22 16">
      <path
        d="M4.374 6.774L1.2 9.954V9A.6.6 0 100 9v2.4a.6.6 0 00.6.6H3a.6.6 0 100-1.2h-.954l3.18-3.174a.602.602 0 00-.852-.852zM2.046 1.2H3A.6.6 0 103 0H.6a.6.6 0 00-.6.6V3a.6.6 0 101.2 0v-.954l3.174 3.18a.6.6 0 00.983-.195.6.6 0 00-.131-.657L2.046 1.2zM11.4 8.4a.6.6 0 00-.6.6v.954l-3.174-3.18a.602.602 0 00-.852.852l3.18 3.174H9A.6.6 0 109 12h2.4a.6.6 0 00.6-.6V9a.6.6 0 00-.6-.6zm.552-8.028A.6.6 0 0011.4 0H9a.6.6 0 100 1.2h.954l-3.18 3.174a.6.6 0 00.195.983.6.6 0 00.657-.131l3.174-3.18V3A.6.6 0 1012 3V.6a.6.6 0 00-.048-.228z"
        fill={fill || theme.grey.shade8}
      />
    </svg>
  );
};

export default Expand;
