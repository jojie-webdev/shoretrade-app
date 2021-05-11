import React from 'react';

import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const FileBookMarkAlt = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25016 8.33366H7.0835C7.30451 8.33366 7.51647 8.24586 7.67275 8.08958C7.82903 7.9333 7.91683 7.72134 7.91683 7.50033C7.91683 7.27931 7.82903 7.06735 7.67275 6.91107C7.51647 6.75479 7.30451 6.66699 7.0835 6.66699H6.25016C6.02915 6.66699 5.81719 6.75479 5.66091 6.91107C5.50463 7.06735 5.41683 7.27931 5.41683 7.50033C5.41683 7.72134 5.50463 7.9333 5.66091 8.08958C5.81719 8.24586 6.02915 8.33366 6.25016 8.33366ZM9.5835 13.3337H6.25016C6.02915 13.3337 5.81719 13.4215 5.66091 13.5777C5.50463 13.734 5.41683 13.946 5.41683 14.167C5.41683 14.388 5.50463 14.6 5.66091 14.7562C5.81719 14.9125 6.02915 15.0003 6.25016 15.0003H9.5835C9.80451 15.0003 10.0165 14.9125 10.1728 14.7562C10.329 14.6 10.4168 14.388 10.4168 14.167C10.4168 13.946 10.329 13.734 10.1728 13.5777C10.0165 13.4215 9.80451 13.3337 9.5835 13.3337ZM9.5835 10.0003H6.25016C6.02915 10.0003 5.81719 10.0881 5.66091 10.2444C5.50463 10.4007 5.41683 10.6126 5.41683 10.8337C5.41683 11.0547 5.50463 11.2666 5.66091 11.4229C5.81719 11.5792 6.02915 11.667 6.25016 11.667H9.5835C9.80451 11.667 10.0165 11.5792 10.1728 11.4229C10.329 11.2666 10.4168 11.0547 10.4168 10.8337C10.4168 10.6126 10.329 10.4007 10.1728 10.2444C10.0165 10.0881 9.80451 10.0003 9.5835 10.0003ZM15.3502 7.81699C15.414 7.66523 15.4314 7.49797 15.4003 7.33631C15.3691 7.17466 15.2908 7.02585 15.1752 6.90866L10.1752 1.90866C10.1063 1.84384 10.0275 1.79039 9.94183 1.75033C9.91696 1.74679 9.89171 1.74679 9.86683 1.75033L9.6335 1.66699H4.5835C3.92046 1.66699 3.28457 1.93038 2.81573 2.39923C2.34689 2.86807 2.0835 3.50395 2.0835 4.16699V15.8337C2.0835 16.4967 2.34689 17.1326 2.81573 17.6014C3.28457 18.0703 3.92046 18.3337 4.5835 18.3337H9.5835C9.80451 18.3337 10.0165 18.2459 10.1728 18.0896C10.329 17.9333 10.4168 17.7213 10.4168 17.5003C10.4168 17.2793 10.329 17.0674 10.1728 16.9111C10.0165 16.7548 9.80451 16.667 9.5835 16.667H4.5835C4.36248 16.667 4.15052 16.5792 3.99424 16.4229C3.83796 16.2666 3.75016 16.0547 3.75016 15.8337V4.16699C3.75016 3.94598 3.83796 3.73402 3.99424 3.57774C4.15052 3.42146 4.36248 3.33366 4.5835 3.33366H8.75016V5.83366C8.75016 6.4967 9.01356 7.13259 9.4824 7.60143C9.95124 8.07027 10.5871 8.33366 11.2502 8.33366H14.5835C14.748 8.33284 14.9086 8.28334 15.045 8.19139C15.1815 8.09945 15.2876 7.96918 15.3502 7.81699ZM11.2502 6.66699C11.0292 6.66699 10.8172 6.5792 10.6609 6.42291C10.5046 6.26663 10.4168 6.05467 10.4168 5.83366V4.50866L12.5752 6.66699H11.2502ZM17.0835 10.0003H12.9168C12.6958 10.0003 12.4839 10.0881 12.3276 10.2444C12.1713 10.4007 12.0835 10.6126 12.0835 10.8337V17.5003C12.0839 17.6511 12.1252 17.7989 12.203 17.928C12.2807 18.0572 12.3921 18.1628 12.5252 18.2337C12.6555 18.3006 12.8011 18.3319 12.9474 18.3246C13.0937 18.3173 13.2355 18.2716 13.3585 18.192L15.0002 17.1087L16.6668 18.192C16.7913 18.264 16.9323 18.3025 17.0761 18.3039C17.2199 18.3053 17.3617 18.2694 17.4875 18.1998C17.6133 18.1301 17.719 18.0291 17.7942 17.9066C17.8695 17.784 17.9117 17.644 17.9168 17.5003V10.8337C17.9168 10.6126 17.829 10.4007 17.6728 10.2444C17.5165 10.0881 17.3045 10.0003 17.0835 10.0003ZM16.2502 15.9337L15.4668 15.4087C15.329 15.3155 15.1665 15.2657 15.0002 15.2657C14.8338 15.2657 14.6713 15.3155 14.5335 15.4087L13.7502 15.9337V11.667H16.2502V15.9337Z"
        fill={fill || '#DADFF2'}
      />
    </svg>
  );
};

export default FileBookMarkAlt;