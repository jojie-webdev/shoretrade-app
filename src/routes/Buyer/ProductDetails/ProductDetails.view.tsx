import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Divider from 'components/base/Divider';
import FavoriteButtonView from 'components/base/FavoriteButton';
import { Expand, Location, Cart } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
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
    listingId,
    selectAddress,
    favorite,
    onFavorite,
    setFavorite,
    productDetailsCard1Props,
    productDetailsCard6Props,
    sellerRatingProps,
    weight,
    setWeight,
    remainingWeight,
    unit,
    pressedBoxRadio,
    setPressedBoxRadio,
    onAddToCart,
    isLoadingListingBoxes,
    groupedBox,
    isPendingAccount,
    isAquafuture,
    catchRecurrence,
  } = props;

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
    // eslint-disable-next-line
  }, [currentListing]);

  useEffect(() => {
    if (newCurrentListing !== undefined) {
      setImages(newCurrentListing?.images);
    }
    // eslint-disable-next-line
  }, [newCurrentListing, newCurrentListing?.images]);

  useEffect(() => {
    if (!isEmpty(groupedBox)) {
      if (isMobile) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        const containerEl = document.querySelector('.screen');
        if (containerEl) {
          containerEl.scrollTo({
            top: containerEl.scrollHeight,
            behavior: 'smooth',
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [groupedBox]);

  return (
    <>
      {newCurrentListing !== undefined ? (
        <>
          <DetailsContainer>
            <Col xs={12} sm={12} md={12} lg={12} className="title">
              <TopBarContainer>
                <div>
                  <Typography variant="title4" weight="500">
                    {productDetailsCard1Props.title}
                  </Typography>
                  {!isMobile ? (
                    <>
                      <EstimationsContainer>
                        <div style={{ marginRight: 6 }}>
                          <Location
                            fill={theme.grey.shade5}
                            width={16}
                            height={16}
                          />
                        </div>
                        <Typography
                          color="shade9"
                          variant="label"
                          style={{ marginRight: 10 }}
                        >
                          {productDetailsCard1Props.location}
                        </Typography>
                        <div style={{ marginLeft: 6 }}>
                          <Expand
                            width={18}
                            height={18}
                            fill={theme.grey.shade5}
                          />
                        </div>
                        <Typography color="shade9" variant="label">
                          {productDetailsCard1Props.size}
                        </Typography>
                      </EstimationsContainer>
                      <StatusContainer>
                        {productDetailsCard1Props.tags?.map((item, index) => {
                          return (
                            <Badge
                              key={index}
                              fontColor={
                                item.type === 'blue'
                                  ? theme.grey.noshade
                                  : theme.grey.shade9
                              }
                              badgeColor={
                                item.type === 'blue'
                                  ? theme.brand.info
                                  : theme.grey.shade3
                              }
                            >
                              <BadgeText
                                variant="caption"
                                weight="bold"
                                color={
                                  item.type === 'blue' ? 'noshade' : 'shade9'
                                }
                              >
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
                            fontColor={
                              item.type === 'blue'
                                ? theme.grey.noshade
                                : theme.grey.shade9
                            }
                            badgeColor={
                              item.type === 'blue'
                                ? theme.brand.info
                                : theme.grey.shade3
                            }
                          >
                            <BadgeText
                              variant="caption"
                              weight="bold"
                              color={
                                item.type === 'blue' ? 'noshade' : 'shade9'
                              }
                            >
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
                  showAlmostGone={
                    Number(remainingWeight) <= 50 && !catchRecurrence
                  }
                  showAquafuture={isAquafuture}
                  showAlwaysAvailable={!!catchRecurrence}
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
                        inputType="decimal"
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
    </>
  );
};

export default ProductDetailsView;
