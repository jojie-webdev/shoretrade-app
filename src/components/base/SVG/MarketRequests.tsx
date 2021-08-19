import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const MarketRequests = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1109 3.05268C15.1195 3.83222 16.1196 5.04662 16.9203 6.49592C17.7209 7.94521 18.2165 9.43835 18.3395 10.7071C18.4008 11.3398 18.3743 11.9662 18.2082 12.5195C18.1303 12.7791 18.0166 13.0363 17.8585 13.2699L20.8668 18.5016C21.1421 18.9804 20.9771 19.5917 20.4984 19.867C20.0196 20.1423 19.4083 19.9773 19.133 19.4985L16.0951 14.2155L16.0701 14.2156L16.0543 14.2243C14.3472 15.1427 11.8869 15.8772 9.64201 16.0363C8.51755 16.116 7.38616 16.056 6.40383 15.7614C5.41684 15.4653 4.49647 14.9033 3.97117 13.9269C3.43456 12.9295 3.51027 11.7933 3.8256 10.7572C4.14366 9.71197 4.74363 8.63278 5.46158 7.61442C6.89821 5.57669 8.93913 3.59818 10.6702 2.36774C10.802 2.2741 10.9486 2.2169 11.0982 2.19412C11.5732 2.04477 12.0644 2.07673 12.5068 2.19902C13.0636 2.35294 13.608 2.66401 14.1109 3.05268ZM11.682 4.10899C11.6801 4.11001 11.607 4.14774 11.5417 4.36552C11.4738 4.59155 11.4399 4.93911 11.4855 5.40979C11.5764 6.34758 11.9639 7.57821 12.6647 8.84685C13.3656 10.1155 14.2011 11.0986 14.9466 11.6748C15.3207 11.9639 15.633 12.1203 15.8604 12.1832C16.0796 12.2437 16.1504 12.202 16.1523 12.2009C16.1543 12.1999 16.2273 12.1621 16.2927 11.9444C16.3606 11.7183 16.3944 11.3708 16.3488 10.9001C16.2579 9.96231 15.8705 8.73168 15.1696 7.46303C14.4688 6.19439 13.6333 5.21129 12.8878 4.63513C12.5136 4.34594 12.2014 4.1896 11.9739 4.12672C11.7548 4.06614 11.6839 4.10787 11.682 4.10899ZM10.9141 9.81397C11.6759 11.193 12.6184 12.3594 13.5769 13.1408C12.9374 13.3759 12.2433 13.5804 11.5361 13.7372C10.8257 13.1716 10.0454 12.2798 9.36807 11.1464C8.55548 9.78651 8.12831 8.47719 8.04971 7.53542C8.51798 6.97929 9.02208 6.44039 9.53542 5.93909C9.70646 7.13122 10.1832 8.49086 10.9141 9.81397ZM6.4942 9.6953C6.76925 10.5089 7.16128 11.3523 7.65123 12.1723C8.06727 12.8685 8.52944 13.5071 9.01451 14.0651C8.23094 14.0855 7.53622 14.013 6.9784 13.8457C6.3124 13.6459 5.92673 13.3404 5.73246 12.9793C5.5495 12.6393 5.50301 12.1148 5.73896 11.3394C5.89255 10.8347 6.15027 10.2793 6.4942 9.6953Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default MarketRequests;
