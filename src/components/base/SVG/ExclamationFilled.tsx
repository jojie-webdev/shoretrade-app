import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const ExclamationFilled = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '28'}
      height={height || '28'}
      viewBox="0 0 28 28"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.59175 2.91382C8.78441 1.44873 11.3623 0.666748 13.9994 0.666748C15.7503 0.666748 17.4841 1.01162 19.1018 1.68169C20.7195 2.35175 22.1893 3.33388 23.4274 4.57199C24.6656 5.81011 25.6477 7.27996 26.3177 8.89764C26.9878 10.5153 27.3327 12.2491 27.3327 14.0001C27.3327 16.6372 26.5507 19.215 25.0856 21.4077C23.6205 23.6003 21.5382 25.3093 19.1018 26.3185C16.6655 27.3276 13.9846 27.5917 11.3982 27.0772C8.81174 26.5628 6.43597 25.2929 4.57126 23.4282C2.70656 21.5635 1.43669 19.1877 0.922218 16.6013C0.407748 14.0149 0.671793 11.334 1.68096 8.89764C2.69013 6.46129 4.3991 4.37891 6.59175 2.91382ZM13.9994 7.3334C13.6457 7.3334 13.3066 7.47388 13.0566 7.72393C12.8065 7.97398 12.666 8.31312 12.666 8.66674V14.0001C12.666 14.3537 12.8065 14.6928 13.0566 14.9429C13.3066 15.1929 13.6457 15.3334 13.9994 15.3334C14.353 15.3334 14.6921 15.1929 14.9422 14.9429C15.1922 14.6928 15.3327 14.3537 15.3327 14.0001V8.66674C15.3327 8.31312 15.1922 7.97398 14.9422 7.72393C14.6921 7.47388 14.353 7.3334 13.9994 7.3334ZM15.226 18.8267C15.1969 18.7418 15.1565 18.6611 15.106 18.5867L14.946 18.3867C14.7585 18.2017 14.5204 18.0764 14.2618 18.0266C14.0031 17.9767 13.7355 18.0046 13.4927 18.1067C13.3311 18.1743 13.1823 18.269 13.0527 18.3867C12.9291 18.5113 12.8314 18.6591 12.765 18.8215C12.6987 18.984 12.665 19.1579 12.666 19.3334C12.6681 19.5076 12.7044 19.6798 12.7727 19.8401C12.8326 20.0055 12.9281 20.1558 13.0526 20.2802C13.177 20.4046 13.3272 20.5002 13.4927 20.5601C13.6523 20.6306 13.8249 20.667 13.9994 20.667C14.1739 20.667 14.3464 20.6306 14.506 20.5601C14.6715 20.5002 14.8218 20.4046 14.9462 20.2802C15.0706 20.1558 15.1662 20.0055 15.226 19.8401C15.2944 19.6798 15.3306 19.5076 15.3327 19.3334C15.3392 19.2446 15.3392 19.1555 15.3327 19.0667C15.3097 18.9817 15.2738 18.9008 15.226 18.8267Z"
        fill="#FFA26B"
      />
    </svg>
  );
};

export default ExclamationFilled;
