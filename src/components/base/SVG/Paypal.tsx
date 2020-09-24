import React from 'react';

import styled from 'utils/styled';
import { useTheme } from 'utils/Theme';

import { SVGProps } from './SVG.props';

const Paypal = (props: SVGProps): JSX.Element => {
  const theme = useTheme();
  const { width, height, fill } = props;

  // Paste converted svg below
  // https://react-svgr.com/playground/?typescript=true
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <path
        d="M11.237 3.935c.153-.97 0-1.627-.524-2.227-.58-.663-1.62-.942-2.96-.942H3.88a.548.548 0 00-.544.467L1.722 11.467a.331.331 0 00.328.384h2.388l-.168 1.047a.292.292 0 00.286.335h2.018c.237 0 .44-.174.481-.412l.021-.104.377-2.409.028-.132a.482.482 0 01.482-.412h.3c1.955 0 3.483-.796 3.93-3.086.189-.956.09-1.759-.405-2.324a1.858 1.858 0 00-.551-.42z"
        fill="#009BDE"
      />
      <path
        d="M11.237 3.935c.153-.97 0-1.627-.524-2.227-.58-.663-1.62-.942-2.96-.942H3.88a.548.548 0 00-.544.467L1.722 11.467a.331.331 0 00.328.384h2.388l.6-3.811-.021.118a.548.548 0 01.544-.468H6.7c2.234 0 3.98-.907 4.496-3.532.02-.077.028-.153.042-.223z"
        fill="#022169"
      />
      <path
        d="M5.687 3.949a.504.504 0 01.272-.363.513.513 0 01.21-.049h3.036c.363 0 .698.02 1.006.07.09.014.174.028.258.049.084.02.16.042.244.062.042.014.077.021.112.035.154.05.293.112.419.175.153-.97 0-1.627-.524-2.227-.586-.656-1.626-.935-2.967-.935H3.88a.548.548 0 00-.544.467L1.722 11.467a.331.331 0 00.328.384h2.388l.6-3.811.65-4.091z"
        fill="#002F87"
      />
    </svg>
  );
};

export default Paypal;
