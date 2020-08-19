import React from 'react';

// import { useTheme } from 'utils/Theme';
import { CategoryDetailGeneratedProps } from './CategoryDetail.props';
import { Container } from './CategoryDetail.style';

const CategoryDetailView = (props: CategoryDetailGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>CategoryDetail Screen</h1>
    </Container>
  );
};

export default CategoryDetailView;