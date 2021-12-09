import React from 'react';

import { SVGProps } from './SVG.props';

const Sync = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '10'}
      height={height || '10'}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.955 6.755H6.69C6.55739 6.755 6.43022 6.80768 6.33645 6.90145C6.24268 6.99522 6.19 7.12239 6.19 7.255C6.19 7.38761 6.24268 7.51479 6.33645 7.60855C6.43022 7.70232 6.55739 7.755 6.69 7.755H7.89C7.33847 8.33137 6.6272 8.72966 5.84758 8.8987C5.06796 9.06774 4.2556 8.9998 3.51489 8.70362C2.77417 8.40744 2.13893 7.89655 1.6908 7.23659C1.24266 6.57662 1.00209 5.79773 1 5C1 4.86739 0.947322 4.74022 0.853554 4.64645C0.759785 4.55268 0.632608 4.5 0.5 4.5C0.367392 4.5 0.240215 4.55268 0.146447 4.64645C0.0526784 4.74022 0 4.86739 0 5C0.00264333 5.9764 0.29111 6.93066 0.829802 7.74502C1.36849 8.55937 2.13383 9.19818 3.03137 9.58261C3.92891 9.96704 4.91937 10.0803 5.88051 9.90832C6.84165 9.73637 7.73142 9.28677 8.44 8.615V9.5C8.44 9.63261 8.49268 9.75979 8.58645 9.85355C8.68022 9.94732 8.80739 10 8.94 10C9.07261 10 9.19979 9.94732 9.29355 9.85355C9.38732 9.75979 9.44 9.63261 9.44 9.5V7.25C9.43877 7.12082 9.38758 6.99713 9.29717 6.90485C9.20675 6.81257 9.08413 6.75887 8.955 6.755ZM5 0C3.71819 0.0036561 2.48675 0.499457 1.56 1.385V0.5C1.56 0.367392 1.50732 0.240215 1.41355 0.146447C1.31979 0.0526784 1.19261 0 1.06 0C0.927392 0 0.800215 0.0526784 0.706447 0.146447C0.612679 0.240215 0.56 0.367392 0.56 0.5V2.75C0.56 2.88261 0.612679 3.00979 0.706447 3.10355C0.800215 3.19732 0.927392 3.25 1.06 3.25H3.31C3.44261 3.25 3.56979 3.19732 3.66355 3.10355C3.75732 3.00979 3.81 2.88261 3.81 2.75C3.81 2.61739 3.75732 2.49022 3.66355 2.39645C3.56979 2.30268 3.44261 2.25 3.31 2.25H2.11C2.66123 1.67394 3.37205 1.27575 4.1512 1.10655C4.93035 0.937358 5.7423 1.00487 6.4828 1.30043C7.22331 1.59599 7.8586 2.10611 8.30712 2.7653C8.75564 3.4245 8.99692 4.20269 9 5C9 5.13261 9.05268 5.25979 9.14645 5.35355C9.24022 5.44732 9.36739 5.5 9.5 5.5C9.63261 5.5 9.75979 5.44732 9.85355 5.35355C9.94732 5.25979 10 5.13261 10 5C10 4.34339 9.87067 3.69321 9.6194 3.08658C9.36813 2.47995 8.99983 1.92876 8.53553 1.46447C8.07124 1.00017 7.52005 0.631876 6.91342 0.380602C6.30679 0.129329 5.65661 0 5 0Z"
        fill={fill || '#09131D'}
      />
    </svg>
  );
};

export default Sync;
