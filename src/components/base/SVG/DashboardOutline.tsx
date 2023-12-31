import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const DashboardOutline = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  return (
    <svg
      width={width || 24}
      height={height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 12C8 11.4477 7.55228 11 7 11C6.44772 11 6 11.4477 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 11.4477 17.5523 11 17 11C16.4477 11 16 11.4477 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M8.39922 7.19998C8.84105 6.8686 9.46785 6.95815 9.79922 7.39998L12.1183 10.4921C12.289 10.4899 12.4628 10.5145 12.6345 10.5687C13.5005 10.8423 13.9808 11.7661 13.7073 12.6321C13.4338 13.4981 12.51 13.9784 11.644 13.7049C10.8071 13.4406 10.3304 12.569 10.5461 11.7291L8.19922 8.59998C7.86785 8.15815 7.95739 7.53135 8.39922 7.19998Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default DashboardOutline;
