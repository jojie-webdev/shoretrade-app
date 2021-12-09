import React from 'react';

import { SVGProps } from './SVG.props';

const Camera = (props: SVGProps): JSX.Element => {
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || '21'}
      height={height || '18'}
      viewBox="0 0 21 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 3.50002H16.22L15.9 2.50002C15.6926 1.91325 15.3077 1.40553 14.7989 1.04718C14.2901 0.68884 13.6824 0.497623 13.06 0.500022H7.94C7.31155 0.501198 6.69933 0.699706 6.18977 1.06753C5.6802 1.43535 5.29901 1.95391 5.1 2.55002L4.78 3.55002H3.5C2.70435 3.55002 1.94129 3.86609 1.37868 4.4287C0.816071 4.99131 0.5 5.75437 0.5 6.55002V14.55C0.5 15.3457 0.816071 16.1087 1.37868 16.6713C1.94129 17.234 2.70435 17.55 3.5 17.55H17.5C18.2956 17.55 19.0587 17.234 19.6213 16.6713C20.1839 16.1087 20.5 15.3457 20.5 14.55V6.55002C20.5066 6.15187 20.4339 5.75638 20.2862 5.38661C20.1384 5.01684 19.9184 4.6802 19.6392 4.39631C19.36 4.11241 19.027 3.88695 18.6597 3.73307C18.2924 3.57919 17.8982 3.49997 17.5 3.50002ZM18.5 14.5C18.5 14.7652 18.3946 15.0196 18.2071 15.2071C18.0196 15.3947 17.7652 15.5 17.5 15.5H3.5C3.23478 15.5 2.98043 15.3947 2.79289 15.2071C2.60536 15.0196 2.5 14.7652 2.5 14.5V6.50002C2.5 6.23481 2.60536 5.98045 2.79289 5.79292C2.98043 5.60538 3.23478 5.50002 3.5 5.50002H5.5C5.71807 5.5114 5.93386 5.4511 6.11443 5.32831C6.295 5.20552 6.43042 5.027 6.5 4.82002L7.04 3.18002C7.10709 2.9814 7.2349 2.80889 7.40537 2.68686C7.57584 2.56484 7.78036 2.49948 7.99 2.50002H13.11C13.3196 2.49948 13.5242 2.56484 13.6946 2.68686C13.8651 2.80889 13.9929 2.9814 14.06 3.18002L14.6 4.82002C14.6642 5.01077 14.7844 5.17771 14.945 5.29903C15.1055 5.42035 15.299 5.4904 15.5 5.50002H17.5C17.7652 5.50002 18.0196 5.60538 18.2071 5.79292C18.3946 5.98045 18.5 6.23481 18.5 6.50002V14.5ZM10.5 5.50002C9.70887 5.50002 8.93552 5.73462 8.27772 6.17414C7.61992 6.61367 7.10723 7.23838 6.80448 7.96929C6.50173 8.70019 6.42252 9.50446 6.57686 10.2804C6.7312 11.0563 7.11216 11.769 7.67157 12.3285C8.23098 12.8879 8.94372 13.2688 9.71964 13.4232C10.4956 13.5775 11.2998 13.4983 12.0307 13.1955C12.7616 12.8928 13.3864 12.3801 13.8259 11.7223C14.2654 11.0645 14.5 10.2911 14.5 9.50002C14.5 8.43916 14.0786 7.42174 13.3284 6.6716C12.5783 5.92145 11.5609 5.50002 10.5 5.50002ZM10.5 11.5C10.1044 11.5 9.71776 11.3827 9.38886 11.163C9.05996 10.9432 8.80362 10.6308 8.65224 10.2654C8.50087 9.89994 8.46126 9.4978 8.53843 9.10984C8.6156 8.72188 8.80608 8.36552 9.08579 8.08581C9.36549 7.80611 9.72186 7.61562 10.1098 7.53845C10.4978 7.46128 10.8999 7.50089 11.2654 7.65226C11.6308 7.80364 11.9432 8.05998 12.1629 8.38888C12.3827 8.71778 12.5 9.10446 12.5 9.50002C12.5 10.0305 12.2893 10.5392 11.9142 10.9142C11.5391 11.2893 11.0304 11.5 10.5 11.5Z"
        fill={fill || '#E35D32'}
      />
    </svg>
  );
};

export default Camera;
