import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const FileUpload = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '16'}
      height={height || '18'}
      viewBox="0 0 16 18"
      fill="none"
    >
      <path
        d="M8.833 15.667H3a.833.833 0 01-.833-.834V3.167A.833.833 0 013 2.333h4.167v2.5a2.5 2.5 0 002.5 2.5h2.5V9a.834.834 0 001.666 0V6.5v-.05a1.084 1.084 0 00-.05-.225V6.15a.89.89 0 00-.158-.233l-5-5a.892.892 0 00-.233-.159.267.267 0 00-.075 0 .733.733 0 00-.275-.091H3a2.5 2.5 0 00-2.5 2.5v11.666a2.5 2.5 0 002.5 2.5h5.833a.833.833 0 100-1.666zm0-12.159l2.159 2.159H9.667a.833.833 0 01-.834-.834V3.508zM4.667 5.667a.833.833 0 100 1.666H5.5a.833.833 0 000-1.666h-.833zm5 3.333h-5a.833.833 0 100 1.667h5a.833.833 0 100-1.667zm5.591 4.408l-1.666-1.666a.835.835 0 00-.275-.175.834.834 0 00-.634 0 .835.835 0 00-.275.175l-1.666 1.666a.837.837 0 101.183 1.184l.242-.25V16.5a.833.833 0 101.666 0v-2.158l.242.25a.832.832 0 001.183 0 .833.833 0 000-1.184zM8 14a.833.833 0 000-1.667H4.667a.833.833 0 100 1.667H8z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default FileUpload;
