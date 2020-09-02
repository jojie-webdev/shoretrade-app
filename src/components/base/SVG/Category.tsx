import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Category = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '20'}
      height={height || '20'}
      viewBox="0 0 20 20"
      fill={fill || '#111E2B'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.22822 14C5.03536 14 4.84683 14.0586 4.68648 14.1685C4.52612 14.2784 4.40114 14.4346 4.32734 14.6173C4.25353 14.8 4.23422 15.0011 4.27185 15.1951C4.30947 15.3891 4.40234 15.5673 4.53871 15.7071C4.67509 15.847 4.84883 15.9422 5.03798 15.9808C5.22714 16.0194 5.4232 15.9996 5.60137 15.9239C5.77955 15.8482 5.93184 15.72 6.03899 15.5556C6.14613 15.3911 6.20332 15.1978 6.20332 15C6.20332 14.7348 6.10059 14.4804 5.91772 14.2929C5.73485 14.1054 5.48683 14 5.22822 14ZM16.988 10L18.1873 8.77C18.7352 8.2075 19.0429 7.445 19.0429 6.65C19.0429 5.855 18.7352 5.0925 18.1873 4.53L15.4278 1.71C14.8793 1.1482 14.1358 0.83264 13.3606 0.83264C12.5854 0.83264 11.8419 1.1482 11.2934 1.71L10.1037 2.94C10.0884 2.15479 9.77347 1.40706 9.22652 0.857361C8.67957 0.307664 7.94423 -0.000157028 7.17842 6.00945e-08H3.27801C2.50217 6.00945e-08 1.7581 0.316071 1.2095 0.87868C0.660899 1.44129 0.352697 2.20435 0.352697 3V17C0.352697 17.7956 0.660899 18.5587 1.2095 19.1213C1.7581 19.6839 2.50217 20 3.27801 20H16.9295C17.7053 20 18.4494 19.6839 18.998 19.1213C19.5466 18.5587 19.8548 17.7956 19.8548 17V13C19.8549 12.2146 19.5548 11.4605 19.0188 10.8996C18.4827 10.3387 17.7536 10.0157 16.988 10ZM8.15353 17C8.15353 17.2652 8.05079 17.5196 7.86793 17.7071C7.68506 17.8946 7.43704 18 7.17842 18H3.27801C3.0194 18 2.77137 17.8946 2.58851 17.7071C2.40564 17.5196 2.30291 17.2652 2.30291 17V3C2.30291 2.73478 2.40564 2.48043 2.58851 2.29289C2.77137 2.10536 3.0194 2 3.27801 2H7.17842C7.43704 2 7.68506 2.10536 7.86793 2.29289C8.05079 2.48043 8.15353 2.73478 8.15353 3V17ZM10.1037 5.76L12.678 3.12C12.8607 2.93375 13.1079 2.82921 13.3655 2.82921C13.6231 2.82921 13.8702 2.93375 14.0529 3.12L16.8125 6C16.9941 6.18736 17.096 6.44081 17.096 6.705C17.096 6.96919 16.9941 7.22264 16.8125 7.41L14.0042 10.29L10.1037 14.24V5.76ZM17.9046 17C17.9046 17.2652 17.8018 17.5196 17.619 17.7071C17.4361 17.8946 17.1881 18 16.9295 18H9.92822C10.0282 17.7036 10.0841 17.3935 10.094 17.08L15.0475 12H16.9295C17.1881 12 17.4361 12.1054 17.619 12.2929C17.8018 12.4804 17.9046 12.7348 17.9046 13V17Z"
        fill={fill || '#111E2B'}
      />
    </svg>
  );
};

export default Category;