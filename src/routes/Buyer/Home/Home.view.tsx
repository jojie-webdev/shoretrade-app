import React from 'react';

// import { useTheme } from 'utils/Theme';
import { HomeGeneratedProps } from './Home.props';
import { Container } from './Home.style';

const HomeView = (props: HomeGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Home Screen</h1>
    </Container>
  );
};

export default HomeView;
