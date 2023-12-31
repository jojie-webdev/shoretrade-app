import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const ListOutline = (props: SVGProps): JSX.Element => {
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
        d="M18 16.5C18 15.9477 17.5523 15.5 17 15.5H11C10.4477 15.5 10 15.9477 10 16.5C10 17.0523 10.4477 17.5 11 17.5H17C17.5523 17.5 18 17.0523 18 16.5Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M7.09922 17.8C6.32602 17.8 5.69922 17.1732 5.69922 16.4C5.69922 15.6269 6.32602 15 7.09922 15C7.87242 15 8.49922 15.6269 8.49922 16.4C8.49922 17.1732 7.87242 17.8 7.09922 17.8Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M18 12C18 11.4477 17.5523 11 17 11H11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H17C17.5523 13 18 12.5523 18 12Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M7.09922 13.3C6.32602 13.3 5.69922 12.6732 5.69922 11.9C5.69922 11.1269 6.32602 10.5 7.09922 10.5C7.87242 10.5 8.49922 11.1269 8.49922 11.9C8.49922 12.6732 7.87242 13.3 7.09922 13.3Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M18 7.5C18 6.94771 17.5523 6.5 17 6.5H11C10.4477 6.5 10 6.94772 10 7.5C10 8.05229 10.4477 8.5 11 8.5H17C17.5523 8.5 18 8.05228 18 7.5Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        d="M7.09922 9C6.32602 9 5.69922 8.3732 5.69922 7.6C5.69922 6.8268 6.32602 6.2 7.09922 6.2C7.87242 6.2 8.49922 6.8268 8.49922 7.6C8.49922 8.3732 7.87242 9 7.09922 9Z"
        fill={fill || theme.grey.shade7}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 18C2 20.2091 3.79086 22 6 22H18C20.2091 22 22 20.2091 22 18V6C22 3.79086 20.2091 2 18 2H6C3.79086 2 2 3.79086 2 6V18ZM6 20C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6Z"
        fill={fill || theme.grey.shade7}
      />
    </svg>
  );
};

export default ListOutline;
