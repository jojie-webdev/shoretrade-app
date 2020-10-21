import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import BoxRadio from 'components/module/BoxRadio';
import Carousel from 'components/module/Carousel';
import Loading from 'components/module/Loading';
import ProductDetailsCard1View from 'components/module/ProductDetailsCard1';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerRating from 'components/module/ProductSellerRating';
import { placeholderImage } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetListingResponseItem } from 'types/store/GetListingState';

import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import {
  Container,
  BannerContainer,
  DetailsContainer,
  SellerRatingContainer,
  BoxContainer,
  DesiredQuantityContainer,
  TextFieldWrapper,
  RemainingWrapper,
  BoxRadioContainer,
  ButtonContainer,
  AddToCartButton,
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
    setFavorite,
    productDetailsCard1Props,
    productDetailsCard6Props,
    sellerRatingProps,
    weight,
    setWeight,
    getBoxes,
    remainingWeight,
    unit,
    boxRadios,
    pressedBoxRadio,
    setPressedBoxRadio,
    onAddToCart,
  } = props;
  const [images, setImages] = useState<string[]>([]);
  const [newCurrentListing, setNewCurrentListing] = useState<
    GetListingResponseItem
  >();

  useEffect(() => {
    selectAddress(listingId);
    // onLoad(listingId);
    setNewCurrentListing(currentListing);
    setFavorite(currentListing?.isFavourite);
  }, [currentListing]);

  useEffect(() => {
    if (newCurrentListing !== undefined) {
      setImages(newCurrentListing?.images);
    }
  }, [newCurrentListing, newCurrentListing?.images]);

  const hideCarouselArrowArea = useMediaQuery({
    query: `(max-width: 565px)`,
  });

  const mediumArrowWidth = useMediaQuery({
    query: BREAKPOINTS['md'],
  });

  const verticalView = useMediaQuery({
    query: `(max-width: 991px)`,
  });
  return (
    <Container>
      {newCurrentListing !== undefined ? (
        <>
          <BannerContainer>
            {images.includes(placeholderImage) ? (
              <img className="placeholder" src={images[0]} alt="Product" />
            ) : (
              <Carousel
                id={'product-details-carousel'}
                images={images}
                loop
                autoplay
                hideArrowArea={hideCarouselArrowArea}
                arrowWidth={mediumArrowWidth ? 75 : undefined}
                // height="295px"
                aspectRatio="9:4"
              />
            )}
          </BannerContainer>
          <div className="wrapper">
            {newCurrentListing.description ? (
              <Typography variant="label" className="description">
                {newCurrentListing.description}
              </Typography>
            ) : null}
            <DetailsContainer nogutter>
              <Col xs={12} sm={12} md={12} lg={6}>
                <ProductDetailsCard1View
                  cBorderRadius={
                    verticalView ? '8px 8px 0px 0px' : '8px 0px 0px 0px'
                  }
                  cBorderWidth={'2px 2px 1px 2px'}
                  isFavorite={favorite}
                  onFavorite={onFavorite}
                  {...productDetailsCard1Props}
                />
                <ProductDetailsCard6View
                  cBorderRadius="0"
                  cBorderWidth="1px 2px 0px 2px"
                  {...productDetailsCard6Props}
                />
                <SellerRatingContainer>
                  <ProductSellerRating isSmallName {...sellerRatingProps} />
                </SellerRatingContainer>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6}>
                <DesiredQuantityContainer>
                  <div className="content">
                    <TextFieldWrapper>
                      <TextField
                        label="Desired Quantity"
                        LeftComponent={
                          <Typography color="shade6">{unit}</Typography>
                        }
                        value={weight}
                        onChangeText={setWeight}
                        type="numeric"
                        onChange={() => getBoxes()}
                      />
                    </TextFieldWrapper>
                    <RemainingWrapper>
                      <Alert
                        variant="alert"
                        content={`Remaining ${remainingWeight} ${unit}`}
                        style={{ borderRadius: 4, padding: 8 }}
                        fullWidth
                      />
                    </RemainingWrapper>

                    {!isEmpty(boxRadios) ? (
                      <BoxContainer>
                        <Typography
                          variant="overline"
                          color="shade6"
                          style={{ paddingTop: 56 }}
                        >
                          BEST BOX WEIGHT MATCH
                        </Typography>
                        {boxRadios.map((p) => (
                          <BoxRadioContainer key={p.id}>
                            <BoxRadio
                              checked={p.id === pressedBoxRadio}
                              {...p}
                              onClick={() =>
                                setPressedBoxRadio((prevState) =>
                                  p.id === prevState ? '' : p.id
                                )
                              }
                            />
                          </BoxRadioContainer>
                        ))}
                      </BoxContainer>
                    ) : (
                      <Loading />
                    )}
                  </div>
                  <ButtonContainer>
                    <AddToCartButton
                      text="Add to Cart"
                      onClick={onAddToCart}
                      variant={pressedBoxRadio ? undefined : 'disabled'}
                    />
                  </ButtonContainer>
                </DesiredQuantityContainer>
              </Col>
            </DetailsContainer>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProductDetailsView;
