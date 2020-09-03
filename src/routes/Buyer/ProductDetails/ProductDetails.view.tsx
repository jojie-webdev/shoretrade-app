import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import { Container } from './ProductDetails.style';

const ProductDetailsView = (props: ProductDetailsGeneratedProps) => {
  const {
    currentListing,
    onLoad,
    listingId,
    addresses,
    selectedAddress,
    selectAddress,
  } = props;

  useEffect(() => {
    selectAddress(listingId);
    onLoad(listingId);
  }, []);

  return (
    <Container>
      <h1>ProductDetails Screen</h1>
    </Container>
  );
};

export default ProductDetailsView;
