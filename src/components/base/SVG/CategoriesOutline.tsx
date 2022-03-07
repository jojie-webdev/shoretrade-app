import React from 'react';

import { SVGProps } from './SVG.props';

const CategoriesOutline = (props: SVGProps): JSX.Element => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3669 8.43459C14.6351 7.92986 14.9033 7.5016 15.13 7.16768C15.0124 7.05707 14.8887 6.93369 14.7644 6.79877C14.2149 6.20214 13.5 5.21364 13.5 4C13.5 3.44771 13.9477 3 14.5 3C15.0523 3 15.5 3.44771 15.5 4C15.5 4.44321 15.7851 4.95471 16.2356 5.44387C16.3246 5.54049 16.4141 5.62981 16.5 5.71057C16.5859 5.62981 16.6754 5.54049 16.7644 5.44387C17.2149 4.95471 17.5 4.44321 17.5 4C17.5 3.44772 17.9477 3 18.5 3C19.0523 3 19.5 3.44772 19.5 4C19.5 5.21364 18.7851 6.20215 18.2356 6.79877C18.1113 6.93369 17.9876 7.05707 17.87 7.16768C18.0967 7.5016 18.3649 7.92986 18.6331 8.43459C19.3005 9.69075 20 11.4813 20 13.5C20 15.5187 19.3005 17.3093 18.6331 18.5654C18.2964 19.1991 17.9596 19.7123 17.705 20.0695C17.5775 20.2485 17.4699 20.3893 17.3923 20.4876C17.3535 20.5368 17.3221 20.5754 17.2994 20.6029L17.272 20.6358L17.2635 20.6458L17.2605 20.6493L17.2594 20.6506L17.2585 20.6516L16.5 20C15.7415 20.6516 15.7406 20.6506 15.7406 20.6506L15.7395 20.6493L15.7365 20.6458L15.728 20.6358L15.7006 20.6029C15.6779 20.5754 15.6465 20.5368 15.6077 20.4876C15.5301 20.3893 15.4225 20.2485 15.295 20.0695C15.0404 19.7123 14.7036 19.1991 14.3669 18.5654C13.6995 17.3093 13 15.5187 13 13.5C13 11.4813 13.6995 9.69075 14.3669 8.43459ZM16.5 8.73188C16.6183 8.92446 16.7426 9.13909 16.8669 9.37302C17.4495 10.4694 18 11.9289 18 13.5C18 13.668 17.9937 13.8348 17.9817 14H15.0183C15.0063 13.8348 15 13.668 15 13.5C15 11.9289 15.5505 10.4694 16.1331 9.37302C16.2574 9.13909 16.3817 8.92446 16.5 8.73188ZM15.4301 16C15.6293 16.5978 15.8781 17.1472 16.1331 17.627C16.2574 17.8609 16.3817 18.0755 16.5 18.2681C16.6183 18.0755 16.7426 17.8609 16.8669 17.627C17.1219 17.1472 17.3707 16.5978 17.5699 16H15.4301Z"
        fill={fill || '#565A6A'}
      />
      <path
        d="M16.5 20L15.7415 20.6516C15.9314 20.8728 16.2085 21 16.5 21C16.7915 21 17.0686 20.8728 17.2585 20.6516C17.2585 20.6516 17.2585 20.6516 16.5 20Z"
        fill={fill || '#565A6A'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.74146 3.34837L7.5 4L8.25854 3.34837C8.06856 3.12723 7.79154 3 7.5 3C7.20846 3 6.93144 3.12723 6.74146 3.34837ZM7.5 17C8.25854 17.6516 8.25895 17.6511 8.25895 17.6511L8.26055 17.6493L8.26348 17.6459L8.27201 17.6358L8.2994 17.6029C8.32209 17.5754 8.35347 17.5368 8.3923 17.4876C8.4699 17.3893 8.57749 17.2485 8.70502 17.0695C8.95957 16.7123 9.29638 16.1991 9.63308 15.5654C10.3005 14.3093 11 12.5187 11 10.5C11 8.48129 10.3005 6.69075 9.63308 5.43459C9.29638 4.8009 8.95957 4.28773 8.70502 3.93049C8.57749 3.75152 8.4699 3.61069 8.3923 3.5124C8.35347 3.46323 8.32209 3.42462 8.2994 3.39711L8.27201 3.36423L8.26348 3.35415L8.26055 3.35072L8.25943 3.34941C8.25943 3.34941 8.25854 3.34837 7.5 4C6.74146 3.34837 6.74146 3.34837 6.74146 3.34837L6.74057 3.34941L6.73945 3.35072L6.73652 3.35415L6.72799 3.36423L6.7006 3.39711C6.67791 3.42462 6.64653 3.46323 6.60771 3.5124C6.5301 3.61069 6.42251 3.75152 6.29498 3.93049C6.04043 4.28773 5.70362 4.8009 5.36692 5.43459C4.69947 6.69075 4 8.48129 4 10.5C4 12.5187 4.69947 14.3093 5.36692 15.5654C5.70362 16.1991 6.04043 16.7123 6.29498 17.0695C6.42251 17.2485 6.5301 17.3893 6.60771 17.4876C6.64653 17.5368 6.67791 17.5754 6.7006 17.6029L6.72799 17.6358L6.73652 17.6459L6.73945 17.6493L6.74057 17.6506C6.74057 17.6506 6.74146 17.6516 7.5 17ZM7.5 17L8.25895 17.6511C8.06898 17.8723 7.79154 18 7.5 18C7.20846 18 6.93144 17.8728 6.74146 17.6516L7.5 17ZM7.5 15.2681C7.38166 15.0755 7.25738 14.8609 7.13308 14.627C6.55053 13.5306 6 12.0711 6 10.5C6 8.92885 6.55053 7.4694 7.13308 6.37302C7.25738 6.13909 7.38166 5.92446 7.5 5.73189C7.61834 5.92446 7.74262 6.13909 7.86692 6.37302C8.44947 7.4694 9 8.92885 9 10.5C9 12.0711 8.44947 13.5306 7.86692 14.627C7.74262 14.8609 7.61834 15.0755 7.5 15.2681Z"
        fill={fill || '#565A6A'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.94248 16.1698L7.5 17L8.05752 16.1698C7.72033 15.9434 7.27967 15.9434 6.94248 16.1698ZM7.5 18.2894C7.58589 18.3702 7.67544 18.4595 7.76443 18.5561C8.21494 19.0453 8.5 19.5568 8.5 20C8.5 20.5523 8.94772 21 9.5 21C10.0523 21 10.5 20.5523 10.5 20C10.5 18.7864 9.78506 17.7979 9.23557 17.2012C8.94437 16.8851 8.65628 16.6322 8.44175 16.4586C8.33373 16.3711 8.24237 16.3021 8.17594 16.2535C8.14268 16.2292 8.11552 16.21 8.09548 16.1959L8.07083 16.1789L8.06271 16.1733L8.05974 16.1713L8.05752 16.1698C8.05752 16.1698 8.05752 16.1698 7.5 17C6.94248 16.1698 6.94248 16.1698 6.94248 16.1698L6.94026 16.1713L6.93729 16.1733L6.92917 16.1789L6.90452 16.1959C6.88448 16.21 6.85732 16.2292 6.82406 16.2535C6.75763 16.3021 6.66627 16.3711 6.55825 16.4586C6.34372 16.6322 6.05563 16.8851 5.76443 17.2012C5.21494 17.7979 4.5 18.7864 4.5 20C4.5 20.5523 4.94772 21 5.5 21C6.05228 21 6.5 20.5523 6.5 20C6.5 19.5568 6.78506 19.0453 7.23557 18.5561C7.32456 18.4595 7.41411 18.3702 7.5 18.2894Z"
        fill={fill || '#565A6A'}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 9C5 8.44772 5.44772 8 6 8L9 8C9.55228 8 10 8.44772 10 9C10 9.55229 9.55228 10 9 10L6 10C5.44772 10 5 9.55228 5 9Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default CategoriesOutline;