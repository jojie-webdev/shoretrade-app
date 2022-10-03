import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Crates2 = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '24'}
      height={height || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5857 2.06561C11.8589 2.00775 12.1411 2.00775 12.4143 2.06561L21.4143 3.97149C22.3387 4.16724 23 4.98321 23 5.9281V18.072C23 19.0169 22.3387 19.8328 21.4143 20.0286L12.4143 21.9345C12.1411 21.9923 11.8589 21.9923 11.5857 21.9345L2.58566 20.0286C1.66127 19.8328 1 19.0169 1 18.072V5.9281C1 4.98321 1.66127 4.16724 2.58566 3.97149L11.5857 2.06561ZM12 4.02222L3 5.9281V18.072L12 19.9779L21 18.072L21 5.9281L12 4.02222Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.53293 5.24555C1.67348 4.71145 2.22039 4.39241 2.75449 4.53297L12 6.96599L21.2455 4.53297C21.7796 4.39241 22.3265 4.71145 22.4671 5.24555C22.6076 5.77965 22.2886 6.32656 21.7545 6.46712L12.509 8.90014C12.1753 8.98794 11.8247 8.98794 11.491 8.90014L2.24551 6.46712C1.71141 6.32656 1.39237 5.77965 1.53293 5.24555Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 21V8.00004H13V21H11Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1679 20.4453L21.1679 5.44534L22.8321 6.55474L12.8321 21.5547L11.1679 20.4453Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.2929 18.7071L11.2929 8.70715L12.7071 7.29293L22.7071 17.2929L21.2929 18.7071Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default Crates2;
