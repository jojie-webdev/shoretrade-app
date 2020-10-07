import React, { useEffect } from 'react';

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
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

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
    onAddToCard,
  } = props;

  useEffect(() => {
    selectAddress(listingId);
    // onLoad(listingId);
    setFavorite(currentListing?.isFavourite);
  }, [currentListing]);

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
      {currentListing !== undefined ? (
        <>
          <BannerContainer>
            <Carousel
              id={'productDetails'}
              images={currentListing.images}
              hideArrowArea={hideCarouselArrowArea}
              arrowWidth={mediumArrowWidth ? 75 : undefined}
            />
          </BannerContainer>
          <div className="wrapper">
            <Typography variant="label" className="description">
              {currentListing.description}
            </Typography>
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

                    {!isEmpty(boxRadios) && (
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
                    )}
                  </div>
                  <ButtonContainer>
                    {pressedBoxRadio ? (
                      <Button
                        style={{ float: 'right', width: '50%' }}
                        text="Add to Cart"
                        onClick={onAddToCard}
                      />
                    ) : (
                      <Button
                        style={{ float: 'right', width: '50%' }}
                        text="Add to Cart"
                        onClick={onAddToCard}
                        variant="disabled"
                      />
                    )}
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
