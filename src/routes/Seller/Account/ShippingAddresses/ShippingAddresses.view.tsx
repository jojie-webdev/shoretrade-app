import React from 'react';

// import { useTheme } from 'utils/Theme';
import { ShippingAddressesGeneratedProps } from './ShippingAddresses.props';
import { Container } from './ShippingAddresses.style';

const ShippingAddressesView = (props: ShippingAddressesGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <h1>ShippingAddresses Screen</h1>
    </Container>
  );
};

export default ShippingAddressesView;