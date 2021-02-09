import React from 'react';

// @ts-ignore
import { CircleProgress } from 'react-gradient-progress';
import { useTheme } from 'utils/Theme';

import { GradientProgressCircleProps } from './GradientProgressCircle.props';
import { Container } from './GradientProgressCircle.style';

const GradientProgressCircle = (
  props: GradientProgressCircleProps
): JSX.Element => {
  const theme = useTheme();

  return (
    <CircleProgress
      width={68}
      fontSize={14}
      fontFamily="Basis Grotesque Pro"
      fontColor={theme.grey.shade7}
      strokeWidth={2}
      primaryColor={['#00C48C', '#FF647C']}
      secondaryColor={theme.grey.shade2}
      {...props}
    />
  );
};

export default GradientProgressCircle;
