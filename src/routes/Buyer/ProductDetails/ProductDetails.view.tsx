import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import TypographyView from 'components/base/Typography';
import ProductDetailsCard1View from 'components/module/ProductDetailsCard1';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerRating from 'components/module/ProductSellerRating';
import { Col } from 'react-grid-system';

import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import {
  Container,
  Image,
  BannerContainer,
  DetailsContainer,
  SellerRatingContainer,
} from './ProductDetails.style';

const ProductDetailsView = (props: ProductDetailsGeneratedProps) => {
  const {
    currentListing,
    onLoad,
    listingId,
    addresses,
    selectedAddress,
    selectAddress,
    favorite,
    onFavorite,
    productDetailsCard1Props,
    productDetailsCard6Props,
    sellerRatingProps,
  } = props;

  useEffect(() => {
    selectAddress(listingId);
    onLoad(listingId);
  }, []);

  console.log(currentListing);
  return (
    <Container>
      {currentListing ? (
        <>
          <BannerContainer>
            <Image src={currentListing.images[0]} />
          </BannerContainer>
          <TypographyView variant="label" className="description">
            Image Description
          </TypographyView>
          <DetailsContainer>
            <Col xs={6}>
              <ProductDetailsCard1View
                cBorderRadius="8px 8px 0 0"
                cBorderWidth="2px 2px 1px 2px"
                isFavorite={favorite}
                onFavorite={onFavorite}
                {...productDetailsCard1Props}
              />
              <ProductDetailsCard6View
                cBorderRadius="0"
                cBorderWidth="1px 2px 1px 2px"
                {...productDetailsCard6Props}
              />
              <SellerRatingContainer>
                <ProductSellerRating isSmallName {...sellerRatingProps} />
              </SellerRatingContainer>
            </Col>
            <Col xs={6}>
              <DetailsContainer>xx</DetailsContainer>
            </Col>
          </DetailsContainer>
        </>
      ) : null}
    </Container>
  );
};

export default ProductDetailsView;
