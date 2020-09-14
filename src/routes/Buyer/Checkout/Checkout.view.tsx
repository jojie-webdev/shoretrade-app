import React from 'react';

// import { useTheme } from 'utils/Theme';
import { CheckoutGeneratedProps } from './Checkout.props';
import { Container } from './Checkout.style';

const CheckoutView = (props: CheckoutGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>Checkout Screen</h1>
    </Container>
  );
};

export default CheckoutView;
