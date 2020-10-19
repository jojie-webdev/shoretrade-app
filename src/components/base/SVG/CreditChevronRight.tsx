import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const CreditChevronRight = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  return (
    <svg width={6} height={8} viewBox="0 0 6 8" fill="none" {...props}>
      <path
        d="M1.113.667a.667.667 0 000 .94L3.473 4l-2.36 2.36a.667.667 0 10.947.94l2.827-2.827a.667.667 0 000-.946L2.06.667a.667.667 0 00-.947 0z"
        fill="#E35D32"
      />
    </svg>
  );
};

export default CreditChevronRight;
