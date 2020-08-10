import React from 'react';

// import { useTheme } from 'utils/Theme';
import { DetailsGeneratedProps } from './Details.props';
import { Container } from './Details.style';

const DetailsView = (props: DetailsGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Details Screen</h1>
    </Container>
  );
};

export default DetailsView;