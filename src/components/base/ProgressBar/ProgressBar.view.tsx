import React from 'react';

import theme from 'utils/Theme';

import { ProgressBarProps } from './ProgressBar.props';
import {
  Container,
  StyledBackgroundLine,
  StyledProgressLine,
} from './ProgressBar.style';

const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  const { progress, color, height, borderRadius } = props;

  return (
    <Container>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${height || 2}px`,
        }}
      >
        <StyledBackgroundLine borderRadius={borderRadius} />
        <StyledProgressLine
          width={progress.toString()}
          color={color || theme.brand.success}
          borderRadius={borderRadius}
        />
      </div>
    </Container>
  );
};

export default React.memo(ProgressBar);
