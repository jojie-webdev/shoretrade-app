import React from 'react';

// import { useTheme } from 'utils/Theme';
import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import { Container } from './ProductDetails.style';

const ProductDetailsView = (props: ProductDetailsGeneratedProps) => {
// const theme = useTheme();
return (
<Container>
  <h1>ProductDetails Screen</h1>
</Container>
);
};

export default ProductDetailsView;