import React from 'react';

import styled from 'utils/styled';
import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Visa = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={28} height={10} viewBox="0 0 28 10" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.73.871l-1.852 8.567H9.637L11.49.871h2.24zm9.428 5.532l1.18-3.217.678 3.217h-1.858zm2.501 3.035h2.072L25.921.871H24.01c-.431 0-.794.247-.955.628l-3.363 7.94h2.354l.467-1.28h2.875l.271 1.28zm-5.85-2.796c.01-2.261-3.16-2.387-3.139-3.397.007-.307.303-.634.95-.717.322-.041 1.207-.074 2.21.383l.393-1.818a6.102 6.102 0 00-2.096-.378c-2.215 0-3.773 1.164-3.786 2.832-.014 1.233 1.113 1.92 1.961 2.332.874.42 1.167.689 1.163 1.064-.007.575-.698.83-1.34.839-1.128.017-1.781-.302-2.302-.542l-.407 1.878c.525.238 1.491.444 2.491.455 2.355 0 3.895-1.15 3.902-2.931zM10.53.872L6.898 9.437H4.529L2.743 2.601c-.109-.42-.203-.575-.532-.752C1.67 1.559.782 1.289 0 1.12L.053.871h3.813c.486 0 .923.32 1.034.873l.943 4.958L8.175.872h2.354z"
        fill="#182E66"
      />
    </svg>
  );
};

export default Visa;
