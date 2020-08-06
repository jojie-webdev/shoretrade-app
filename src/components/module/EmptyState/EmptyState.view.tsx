import React from 'react';

// import { useTheme } from 'utils/Theme';

import Button from 'components/base/Button';

import { EmptyStateProps } from './EmptyState.props';
import { Container, MainText, Circle } from './EmptyState.style';

const EmptyState = (props: EmptyStateProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <Container>
      <MainText variant="title5" className="title">
        The are no listings here at the moment
      </MainText>

      <Circle></Circle>

      <Button text="Add a product"></Button>
    </Container>
  );
};

export default React.memo(EmptyState);
