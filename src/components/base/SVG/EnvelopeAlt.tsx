import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const EnvelopeAlt = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 25}
      height={height || 24}
      viewBox="0 0 25 24"
      fill={fill || theme.grey.shade7}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.668 4H5.66797C4.87232 4 4.10926 4.31607 3.54665 4.87868C2.98404 5.44129 2.66797 6.20435 2.66797 7V17C2.66797 17.7956 2.98404 18.5587 3.54665 19.1213C4.10926 19.6839 4.87232 20 5.66797 20H19.668C20.4636 20 21.2267 19.6839 21.7893 19.1213C22.3519 18.5587 22.668 17.7956 22.668 17V7C22.668 6.20435 22.3519 5.44129 21.7893 4.87868C21.2267 4.31607 20.4636 4 19.668 4ZM5.66797 6H19.668C19.9332 6 20.1875 6.10536 20.3751 6.29289C20.5626 6.48043 20.668 6.73478 20.668 7L12.668 11.88L4.66797 7C4.66797 6.73478 4.77333 6.48043 4.96086 6.29289C5.1484 6.10536 5.40275 6 5.66797 6ZM20.668 17C20.668 17.2652 20.5626 17.5196 20.3751 17.7071C20.1875 17.8946 19.9332 18 19.668 18H5.66797C5.40275 18 5.1484 17.8946 4.96086 17.7071C4.77333 17.5196 4.66797 17.2652 4.66797 17V9.28L12.148 13.85C12.3 13.9378 12.4724 13.984 12.648 13.984C12.8235 13.984 12.9959 13.9378 13.148 13.85L20.668 9.28V17Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default EnvelopeAlt;
