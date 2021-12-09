import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const PlaceholderIcon = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  return (
    <svg width={width || 25} height={height || 16} viewBox="0 0 22 16">
      <path
        d="M25 3.333H12.333a1.333 1.333 0 000 2.667H25a1.333 1.333 0 011.333 1.333v9.014l-2.506-2.507a4.002 4.002 0 00-1.52-.947 1.336 1.336 0 10-.854 2.534c.185.058.35.163.48.306l4.414 4.387a.88.88 0 000 .2 1.095 1.095 0 000 .2c.05.085.108.166.173.24a.64.64 0 00.12.147c.08.074.17.136.267.186a1.214 1.214 0 00.64.187 1.334 1.334 0 001.333-1.333V7.333a4 4 0 00-3.88-4zM3.28 1.053a1.339 1.339 0 00-1.893 1.894L3.24 4.8a4 4 0 00-.907 2.533v13.334a4 4 0 004 4H23.12l2.267 2.28a1.331 1.331 0 001.893 0 1.333 1.333 0 000-1.894l-24-24zM5 7.333c.003-.214.058-.424.16-.613l3.627 3.613a3.999 3.999 0 00-1.334.84L5 13.68V7.333zM6.333 22A1.334 1.334 0 015 20.667V17.44l4.4-4.387a1.333 1.333 0 011.867 0L20.213 22H6.333z"
        fill={fill || theme.grey.shade5}
      />
    </svg>
  );
};

export default PlaceholderIcon;
