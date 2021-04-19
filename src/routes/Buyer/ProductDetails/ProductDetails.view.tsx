import React, { useEffect, useState, useRef } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import FavoriteButtonView from 'components/base/FavoriteButton';
import { Expand, Heart, HeartFilled, Location } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import BoxRadio from 'components/module/BoxRadio';
import CarouselV2 from 'components/module/CarouselV2';
import Loading from 'components/module/Loading';
import ProductDetailCard from 'components/module/ProductDetailCard';
import ProductDetailsCard1View from 'components/module/ProductDetailsCard1';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerCard from 'components/module/ProductSellerCard';
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
  BoxContainer,
  DesiredQuantityContainer,
  TextFieldWrapper,
  RemainingWrapper,
  BoxRadioContainer,
  ButtonContainer,
  AddToCartButton,
  EstimationsContainer,
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

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
    <Container isMobile={isMobile}>
      {newCurrentListing !== undefined ? (
        <>
          <DetailsContainer>
            <Col xs={12} sm={12} md={12} lg={12} className="title">
              <Typography variant="title4">
                {productDetailsCard1Props.title}
              </Typography>
              {!isMobile && (
                <EstimationsContainer>
                  <div style={{ marginRight: 6 }}>
                    <Location width={14} height={16} />
                  </div>
                  <Typography
                    variant="label"
                    style={{ fontWeight: 500, marginRight: 10 }}
                  >
                    {productDetailsCard1Props.location}
                  </Typography>
                  <div style={{ marginLeft: 6 }}>
                    <Expand />
                  </div>
                  <Typography variant="label" style={{ fontWeight: 500 }}>
                    {productDetailsCard1Props.size}
                  </Typography>
                </EstimationsContainer>
              )}
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="title">
              <BannerContainer>
                <CarouselV2
                  id={'product-details-carousel'}
                  images={images}
                  loop
                  // autoplay
                  aspectRatio="9:4"
                  showAlmostGone={Number(remainingWeight) <= 50}
                  showAquafuture={isAquafuture}
                  showActionButton={isMobile}
                  actionButton={
                    <FavoriteButtonView
                      isFavorite={favorite}
                      onClick={onFavorite}
                    />
                  }
                />
              </BannerContainer>

              {newCurrentListing.description ? (
                <Typography variant="label" className="description">
                  {newCurrentListing.description}
                </Typography>
              ) : null}
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <ProductDetailsCard6View
                cBorderRadius="0"
                withBackground={!isMobile}
                cBorderWidth={`1px 2px ${isPendingAccount ? 2 : 0}px 2px`}
                {...productDetailsCard6Props}
                SellerCard={
                  !isMobile ? (
                    <ProductSellerCard
                      location={productDetailsCard1Props.location}
                      isSmallName
                      withBackground={false}
                      showFavoriteButton={false}
                      {...sellerRatingProps}
                    />
                  ) : null
                }
              />
              {!isPendingAccount && isMobile ? (
                <ProductSellerCard
                  location={productDetailsCard1Props.location}
                  isSmallName
                  withBackground={true}
                  showFavoriteButton={true}
                  {...sellerRatingProps}
                />
              ) : (
                ''
              )}
              {isPendingAccount ? (
                <Alert
                  variant="alert"
                  content={`Price hidden pending account approval.`}
                  fullWidth
                  alignText="center"
                />
              ) : (
                <DesiredQuantityContainer withBackground={!isMobile}>
                  {isMobile && <Divider />}
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
