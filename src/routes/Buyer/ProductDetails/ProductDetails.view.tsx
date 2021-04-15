import React, { useEffect, useState, useRef } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import BoxRadio from 'components/module/BoxRadio';
import CarouselV2 from 'components/module/CarouselV2';
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
    pressedBoxRadio,
    setPressedBoxRadio,
    onAddToCart,
    isLoadingListingBoxes,
    groupedBox,
    isPendingAccount,
    isAquafuture,
  } = props;
  const boxWeightsRef = useRef<HTMLDivElement>(null);
  const [didScroll, setDidScroll] = useState(false);
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

  useEffect(() => {
    if (!isEmpty(groupedBox) && !didScroll) {
      setDidScroll(true);
      boxWeightsRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [groupedBox]);

  const verticalView = useMediaQuery({
    query: `(max-width: 991px)`,
  });
  return (
    <Container>
      {newCurrentListing !== undefined ? (
        <>
          <DetailsContainer>
            <Col xs={12} sm={12} md={12} lg={6}>
              <BannerContainer>
                <CarouselV2
                  id={'product-details-carousel'}
                  images={images}
                  loop
                  // autoplay
                  aspectRatio="9:4"
                  showAlmostGone={Number(remainingWeight) <= 50}
                  showAquafuture={isAquafuture}
                />
              </BannerContainer>

              {newCurrentListing.description ? (
                <Typography variant="label" className="description">
                  {newCurrentListing.description}
                </Typography>
              ) : null}
              <ProductDetailsCard1View
                cBorderRadius={
                  verticalView ? '8px 8px 0px 0px' : '8px 8px 0px 0px'
                }
                cBorderWidth={'2px 2px 1px 2px'}
                isFavorite={favorite}
                onFavorite={onFavorite}
                {...productDetailsCard1Props}
              />
              <ProductDetailsCard6View
                cBorderRadius="0"
                cBorderWidth={`1px 2px ${isPendingAccount ? 2 : 0}px 2px`}
                {...productDetailsCard6Props}
              />
              {!isPendingAccount && (
                <SellerRatingContainer>
                  <ProductSellerRating isSmallName {...sellerRatingProps} />
                </SellerRatingContainer>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              {isPendingAccount ? (
                <Alert
                  variant="alert"
                  content={`Price hidden pending account approval.`}
                  fullWidth
                  alignText="center"
                />
              ) : (
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
                      />
                    </TextFieldWrapper>
                    <RemainingWrapper>
                      <Alert
                        variant="alert"
                        content={`Remaining ${remainingWeight} ${unit}`}
                        fullWidth
                        alignText="center"
                      />
                    </RemainingWrapper>

                    {!isEmpty(groupedBox) ? (
                      <BoxContainer>
                        <Typography
                          variant="overline"
                          color="shade6"
                          style={{ paddingTop: 32 }}
                        >
                          BEST BOX WEIGHT MATCH
                        </Typography>
                        {groupedBox.map((p) => (
                          <BoxRadioContainer key={p.id}>
                            <BoxRadio
                              id={p.id}
                              checked={p.id === pressedBoxRadio}
                              totalWeight={p.totalWeight}
                              boxes={p.boxes}
                              cost={p.cost}
                              unit={p.unit}
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
                      isLoadingListingBoxes && (
                        <div className="box-loading">
                          <Loading />
                        </div>
                      )
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
              )}
            </Col>
          </DetailsContainer>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ProductDetailsView;
