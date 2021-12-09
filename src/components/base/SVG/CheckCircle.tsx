import React from 'react';

import { SVGProps } from './SVG.props';

const CheckCircle = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2664 8.07508L8.69139 11.6584L7.31639 10.2834C7.24168 10.1962 7.14975 10.1253 7.04636 10.0753C6.94297 10.0253 6.83036 9.99718 6.7156 9.99275C6.60083 9.98832 6.48639 10.0077 6.37945 10.0496C6.27251 10.0914 6.17539 10.155 6.09418 10.2362C6.01296 10.3174 5.94942 10.4145 5.90752 10.5215C5.86563 10.6284 5.84629 10.7429 5.85072 10.8576C5.85515 10.9724 5.88326 11.085 5.93328 11.1884C5.9833 11.2918 6.05415 11.3837 6.14139 11.4584L8.09972 13.4251C8.17759 13.5023 8.26993 13.5634 8.37146 13.6049C8.47299 13.6464 8.58171 13.6674 8.69139 13.6667C8.91 13.6658 9.1195 13.579 9.27472 13.4251L13.4414 9.25842C13.5195 9.18095 13.5815 9.08878 13.6238 8.98723C13.6661 8.88568 13.6879 8.77676 13.6879 8.66675C13.6879 8.55674 13.6661 8.44782 13.6238 8.34627C13.5815 8.24472 13.5195 8.15255 13.4414 8.07508C13.2852 7.91987 13.074 7.83275 12.8539 7.83275C12.6337 7.83275 12.4225 7.91987 12.2664 8.07508ZM9.99972 2.41675C8.35154 2.41675 6.74038 2.90549 5.36997 3.82117C3.99956 4.73685 2.93145 6.03834 2.30072 7.56105C1.66999 9.08377 1.50496 10.7593 1.82651 12.3758C2.14805 13.9923 2.94172 15.4772 4.10716 16.6426C5.2726 17.8081 6.75746 18.6017 8.37397 18.9233C9.99047 19.2448 11.666 19.0798 13.1887 18.4491C14.7115 17.8183 16.013 16.7502 16.9286 15.3798C17.8443 14.0094 18.3331 12.3983 18.3331 10.7501C18.3331 9.65573 18.1175 8.5721 17.6987 7.56105C17.2799 6.55001 16.6661 5.63135 15.8923 4.85752C15.1185 4.0837 14.1998 3.46987 13.1887 3.05109C12.1777 2.6323 11.0941 2.41675 9.99972 2.41675ZM9.99972 17.4167C8.68118 17.4167 7.39224 17.0258 6.29592 16.2932C5.19959 15.5607 4.34511 14.5195 3.84052 13.3013C3.33594 12.0831 3.20392 10.7427 3.46115 9.44948C3.71839 8.15627 4.35332 6.96839 5.28567 6.03604C6.21802 5.10369 7.40591 4.46875 8.69912 4.21151C9.99232 3.95428 11.3328 4.0863 12.5509 4.59088C13.7691 5.09547 14.8103 5.94995 15.5428 7.04628C16.2754 8.14261 16.6664 9.43154 16.6664 10.7501C16.6664 12.5182 15.964 14.2139 14.7138 15.4641C13.4635 16.7144 11.7678 17.4167 9.99972 17.4167Z"
        fill={fill || '#565A6A'}
      />
    </svg>
  );
};

export default CheckCircle;
