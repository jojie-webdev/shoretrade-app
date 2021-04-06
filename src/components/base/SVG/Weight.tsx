import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Weight = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;
  return (
    <svg
      width={width || '16'}
      height={height || '16'}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M12.6663 2.66647H11.6997C11.62 2.42334 11.4957 2.19724 11.333 1.9998C11.1444 1.78889 10.9131 1.62041 10.6546 1.50549C10.396 1.39057 10.116 1.33182 9.83301 1.33313H6.17967C5.89448 1.32992 5.61189 1.38775 5.35088 1.50273C5.08987 1.61772 4.85647 1.7872 4.66634 1.9998C4.49891 2.19617 4.36999 2.42234 4.28634 2.66647H3.33301C2.80257 2.66647 2.29387 2.87718 1.91879 3.25225C1.54372 3.62733 1.33301 4.13603 1.33301 4.66647V12.6665C1.33301 13.1969 1.54372 13.7056 1.91879 14.0807C2.29387 14.4558 2.80257 14.6665 3.33301 14.6665H12.6663C13.1968 14.6665 13.7055 14.4558 14.0806 14.0807C14.4556 13.7056 14.6663 13.1969 14.6663 12.6665V4.66647C14.6663 4.13603 14.4556 3.62733 14.0806 3.25225C13.7055 2.87718 13.1968 2.66647 12.6663 2.66647ZM5.67967 2.89313C5.74215 2.82202 5.81905 2.76503 5.90526 2.72595C5.99147 2.68686 6.08502 2.66659 6.17967 2.66647H9.81967C9.91433 2.66659 10.0079 2.68686 10.0941 2.72595C10.1803 2.76503 10.2572 2.82202 10.3197 2.89313C10.3826 2.96313 10.43 3.04566 10.4587 3.13529C10.4874 3.22491 10.4968 3.31961 10.4863 3.41313L10.153 6.0798C10.1334 6.24241 10.0545 6.39209 9.93157 6.50029C9.80862 6.6085 9.65013 6.66765 9.48634 6.66647H8.39301L9.15301 5.06647C9.21463 4.90957 9.21453 4.73514 9.15272 4.57831C9.09091 4.42149 8.97198 4.29389 8.81988 4.22122C8.66778 4.14855 8.4938 4.1362 8.33296 4.18665C8.17211 4.2371 8.03635 4.34661 7.95301 4.49313L6.91301 6.66647H6.51301C6.34922 6.66765 6.19073 6.6085 6.06777 6.50029C5.94481 6.39209 5.86599 6.24241 5.84634 6.0798L5.51301 3.41313C5.50251 3.31961 5.51193 3.22491 5.54066 3.13529C5.56939 3.04566 5.61676 2.96313 5.67967 2.89313ZM13.333 12.6665C13.333 12.8433 13.2628 13.0128 13.1377 13.1379C13.0127 13.2629 12.8432 13.3331 12.6663 13.3331H3.33301C3.1562 13.3331 2.98663 13.2629 2.8616 13.1379C2.73658 13.0128 2.66634 12.8433 2.66634 12.6665V4.66647C2.66634 4.48966 2.73658 4.32009 2.8616 4.19506C2.98663 4.07004 3.1562 3.9998 3.33301 3.9998H4.24634L4.52634 6.24647C4.5868 6.73308 4.82393 7.18052 5.19265 7.50377C5.56137 7.82702 6.036 8.00354 6.52634 7.9998H9.49967C9.99001 8.00354 10.4646 7.82702 10.8334 7.50377C11.2021 7.18052 11.4392 6.73308 11.4997 6.24647L11.753 3.9998H12.6663C12.8432 3.9998 13.0127 4.07004 13.1377 4.19506C13.2628 4.32009 13.333 4.48966 13.333 4.66647V12.6665ZM9.33301 10.6665H6.66634C6.48953 10.6665 6.31996 10.7367 6.19494 10.8617C6.06991 10.9868 5.99967 11.1563 5.99967 11.3331C5.99967 11.5099 6.06991 11.6795 6.19494 11.8045C6.31996 11.9296 6.48953 11.9998 6.66634 11.9998H9.33301C9.50982 11.9998 9.67939 11.9296 9.80441 11.8045C9.92944 11.6795 9.99967 11.5099 9.99967 11.3331C9.99967 11.1563 9.92944 10.9868 9.80441 10.8617C9.67939 10.7367 9.50982 10.6665 9.33301 10.6665Z"
        fill={fill ||'#BBC2DC'}
      />
    </svg>
  );
};

export default Weight;
