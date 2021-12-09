import React from 'react';

import { ProgressBarProps } from './ProgressBar.props';
import {
  Container,
  StyledBackgroundLine,
  StyledProgressLine,
} from './ProgressBar.style';

const ProgressBar = (props: ProgressBarProps): JSX.Element => {
  const { progress } = props;

  return (
    <Container>
      <div style={{ position: 'relative', width: '100%' }}>
        <StyledBackgroundLine />
        <StyledProgressLine width={progress.toString()} />
      </div>
    </Container>
  );
};

export default React.memo(ProgressBar);
