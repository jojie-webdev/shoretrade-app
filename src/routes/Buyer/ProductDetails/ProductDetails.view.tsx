import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import { Col } from 'react-grid-system';

import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import {
  Container,
  Image,
  BannerContainer,
  DetailsContainer,
} from './ProductDetails.style';

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
      {currentListing ? (
        <>
          <BannerContainer>
            <Image src={currentListing.images[0]} />
          </BannerContainer>
          <TypographyView variant="label" className="description">
            {currentListing.description}
          </TypographyView>
          <DetailsContainer>
            <Col xs={6}>
              <DetailsContainer></DetailsContainer>
            </Col>
            <Col xs={6}>
              <DetailsContainer></DetailsContainer>
            </Col>
          </DetailsContainer>
        </>
      ) : null}
    </Container>
  );
};

export default ProductDetailsView;
