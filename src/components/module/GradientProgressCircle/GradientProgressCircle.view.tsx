import React from 'react';

// @ts-ignore
import { CircleProgress } from 'react-gradient-progress';
import { useTheme } from 'utils/Theme';

import { GradientProgressCircleProps } from './GradientProgressCircle.props';

const GradientProgressCircle = (
  props: GradientProgressCircleProps
): JSX.Element => {
  const theme = useTheme();

  return (
    <CircleProgress
      width={props.width || 68}
      fontSize={14}
      fontFamily="Basis Grotesque Pro"
      fontColor={props.fontColor || theme.grey.shade7}
      strokeWidth={props.strokeWidth || 2}
      primaryColor={props.primaryColor || ['#00C48C', '#FF647C']}
      secondaryColor={props.secondaryColor || theme.grey.shade2}
      {...props}
    />
  );
};

export default GradientProgressCircle;
