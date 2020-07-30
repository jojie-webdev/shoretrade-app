import React from 'react';

// import { useTheme } from 'utils/Theme';
import { DashboardGeneratedProps } from './Dashboard.props';
import { Container } from './Dashboard.style';

const DashboardView = (props: DashboardGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Dashboard Screen</h1>
    </Container>
  );
};

export default DashboardView;
