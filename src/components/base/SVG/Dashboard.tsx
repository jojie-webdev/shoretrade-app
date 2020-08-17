import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Dashboard = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '20'}
      height={height || '21'}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0153 2.95453C17.0081 2.94672 17.006 2.93634 16.9985 2.92871C16.9911 2.92108 16.9808 2.91876 16.9731 2.91138C15.1492 1.04693 12.679 0 10.1038 0C7.52854 0 5.05832 1.04693 3.23442 2.91138C3.22675 2.91876 3.21651 2.92102 3.20901 2.92871C3.20151 2.9364 3.19942 2.94671 3.19229 2.95453C1.83324 4.35495 0.909175 6.13686 0.536705 8.07536C0.164234 10.0139 0.360056 12.0221 1.09946 13.8465C1.83886 15.671 3.0887 17.23 4.69123 18.3267C6.29377 19.4234 8.17719 20.0087 10.1038 20.0087C12.0304 20.0087 13.9138 19.4234 15.5163 18.3267C17.1189 17.23 18.3687 15.671 19.1081 13.8465C19.8475 12.0221 20.0433 10.0139 19.6708 8.07536C19.2984 6.13686 18.3743 4.35495 17.0153 2.95453ZM10.1037 18C8.93581 17.9996 7.78294 17.7298 6.73051 17.2104C5.67809 16.6911 4.75306 15.9357 4.02395 15H7.93926C8.21042 15.3144 8.5436 15.5661 8.91674 15.7385C9.28988 15.9109 9.69447 16 10.1037 16C10.513 16 10.9176 15.9109 11.2907 15.7385C11.6639 15.5661 11.997 15.3144 12.2682 15H16.1835C15.4544 15.9357 14.5294 16.6911 13.477 17.2105C12.4245 17.7298 11.2716 17.9996 10.1037 18ZM9.12862 13C9.12862 12.8022 9.18581 12.6089 9.29296 12.4444C9.4001 12.28 9.55239 12.1518 9.73057 12.0761C9.90875 12.0004 10.1048 11.9806 10.294 12.0192C10.4831 12.0578 10.6569 12.153 10.7932 12.2929C10.9296 12.4327 11.0225 12.6109 11.0601 12.8049C11.0977 12.9989 11.0784 13.2 11.0046 13.3827C10.9308 13.5654 10.8058 13.7216 10.6455 13.8315C10.4851 13.9413 10.2966 14 10.1037 14C9.84519 13.9997 9.59732 13.8943 9.41451 13.7068C9.2317 13.5193 9.12888 13.2651 9.12862 13ZM17.3295 13.0021L17.3194 13H13.029C13.0272 12.3816 12.8387 11.779 12.4895 11.2748C12.1404 10.7707 11.6476 10.3897 11.0788 10.1843V7C11.0788 6.73478 10.9761 6.48043 10.7932 6.29289C10.6104 6.10536 10.3623 6 10.1037 6C9.84511 6 9.59709 6.10536 9.41422 6.29289C9.23136 6.48043 9.12862 6.73478 9.12862 7V10.1843C8.55988 10.3897 8.06709 10.7707 7.71791 11.2748C7.36872 11.779 7.18027 12.3816 7.17841 13H2.88805L2.87799 13.0021C2.62436 12.3603 2.45379 11.6872 2.37063 11H3.278C3.53661 11 3.78463 10.8946 3.9675 10.7071C4.15037 10.5196 4.2531 10.2652 4.2531 10C4.2531 9.73478 4.15037 9.48043 3.9675 9.29289C3.78463 9.10536 3.53661 9 3.278 9H2.37063C2.54487 7.57857 3.09034 6.23182 3.9494 5.10211L4.58782 5.75684C4.67835 5.84969 4.78584 5.92334 4.90413 5.97359C5.02242 6.02384 5.14921 6.0497 5.27725 6.0497C5.40529 6.0497 5.53207 6.02384 5.65036 5.97359C5.76866 5.92334 5.87614 5.84968 5.96668 5.75683C6.05721 5.66398 6.12903 5.55376 6.17803 5.43244C6.22703 5.31113 6.25225 5.18111 6.25225 5.0498C6.25225 4.91849 6.22703 4.78847 6.17803 4.66716C6.12903 4.54585 6.05721 4.43562 5.96667 4.34277L5.32831 3.68811C6.42982 2.80741 7.74282 2.24817 9.12862 2.06946V3C9.12862 3.26522 9.23136 3.51957 9.41422 3.70711C9.59709 3.89464 9.84511 4 10.1037 4C10.3623 4 10.6104 3.89464 10.7932 3.70711C10.9761 3.51957 11.0788 3.26522 11.0788 3V2.06946C12.4646 2.24817 13.7776 2.80741 14.8791 3.68811L14.2408 4.34277C14.0579 4.53029 13.9552 4.78461 13.9552 5.0498C13.9552 5.31499 14.0579 5.56932 14.2408 5.75683C14.4236 5.94435 14.6716 6.0497 14.9302 6.0497C15.1888 6.0497 15.4368 5.94436 15.6196 5.75684L16.2581 5.10211C17.1171 6.23182 17.6626 7.57857 17.8368 9H16.9295C16.6708 9 16.4228 9.10536 16.2399 9.29289C16.0571 9.48043 15.9543 9.73478 15.9543 10C15.9543 10.2652 16.0571 10.5196 16.2399 10.7071C16.4228 10.8946 16.6708 11 16.9295 11H17.8368C17.7537 11.6872 17.5831 12.3603 17.3295 13.0021Z"
        fill={fill || 'white'}
      />
    </svg>
  );
};

export default Dashboard;