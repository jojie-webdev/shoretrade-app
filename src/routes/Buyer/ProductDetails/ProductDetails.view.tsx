import React, { useEffect, useState, useRef } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Divider from 'components/base/Divider';
import FavoriteButtonView from 'components/base/FavoriteButton';
import { Expand, Location, Cart } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import BoxRadio from 'components/module/BoxRadio';
import Carousel from 'components/module/Carousel';
import Loading from 'components/module/Loading';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerCard from 'components/module/ProductSellerCard';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetListingResponseItem } from 'types/store/GetListingState';
import theme from 'utils/Theme';

import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import {
  BannerContainer,
  DetailsContainer,
  ProductBoxContainer,
  DesiredQuantityContainer,
  TextFieldWrapper,
  RemainingWrapper,
  BoxRadioContainer,
  ButtonContainer,
  AddToCartButton,
  EstimationsContainer,
  TopBarContainer,
  StatusContainer,
  BadgeText,
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

  return (
    <BoxContainer>
      {newCurrentListing !== undefined ? (
        <>
          <DetailsContainer>
            <Col xs={12} sm={12} md={12} lg={12} className="title">
              <TopBarContainer>
                <div>
                  <Typography variant="title4">
                    {productDetailsCard1Props.title}
                  </Typography>
                  {!isMobile ? (
                    <>
                      <EstimationsContainer>
                        <div style={{ marginRight: 6 }}>
                          <Location
                            fill={theme.grey.shade5}
                            width={14}
                            height={16}
                          />
                        </div>
                        <Typography
                          color="shade6"
                          variant="label"
                          style={{ fontWeight: 500, marginRight: 10 }}
                        >
                          {productDetailsCard1Props.location}
                        </Typography>
                        <div style={{ marginLeft: 6 }}>
                          <Expand fill={theme.grey.shade5} />
                        </div>
                        <Typography
                          color="shade6"
                          variant="label"
                          style={{ fontWeight: 500 }}
                        >
                          {productDetailsCard1Props.size}
                        </Typography>
                      </EstimationsContainer>
                      <StatusContainer>
                        {productDetailsCard1Props.tags?.map((item, index) => {
                          return (
                            <Badge
                              key={index}
                              fontColor={theme.grey.shade9}
                              badgeColor={theme.grey.shade3}
                            >
                              <BadgeText variant="caption" weight="bold">
                                {item.label}
                              </BadgeText>
                            </Badge>
                          );
                        })}
                      </StatusContainer>
                    </>
                  ) : (
                    <StatusContainer>
                      {productDetailsCard1Props.tags?.map((item, index) => {
                        return (
                          <Badge
                            key={index}
                            fontColor={theme.grey.shade9}
                            badgeColor={theme.grey.shade3}
                          >
                            <BadgeText variant="caption" weight="bold">
                              {item.label}
                            </BadgeText>
                          </Badge>
                        );
                      })}
                    </StatusContainer>
                  )}
                </div>
                {!isMobile && (
                  <FavoriteButtonView
                    onClick={onFavorite}
                    isFavorite={favorite}
                    iconOnly={false}
                  />
                )}
              </TopBarContainer>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="title">
              <BannerContainer>
                <Carousel
                  id={'product-details-carousel'}
                  images={images}
                  loop
                  // autoplay
                  variant={isMobile ? 'bullet' : 'thumbnail'}
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
                withBackground={false}
                cBorderWidth={`1px 2px ${isPendingAccount ? 2 : 0}px 2px`}
                {...productDetailsCard6Props}
                SellerCard={
                  !isMobile ? (
                    <ProductSellerCard
                      location={productDetailsCard1Props.location}
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
                  withBackground={false}
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
                        inputType="numeric"
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
                      <ProductBoxContainer>
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
                      </ProductBoxContainer>
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
                      iconPosition="before"
                      icon={
                        <Cart fill={pressedBoxRadio ? '' : theme.grey.shade5} />
                      }
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
    </BoxContainer>
  );
};

export default ProductDetailsView;
