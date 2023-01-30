import React, { useEffect, useMemo, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Divider from 'components/base/Divider';
import FavoriteButtonView from 'components/base/FavoriteButton';
import Radio from 'components/base/Radio';
import {
  Expand,
  Location,
  ShoppingTrolley,
  Crate,
  CheckFilled,
  MarketBoardOutlined,
} from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import BoxRadio from 'components/module/BoxRadio';
import Carousel from 'components/module/Carousel';
import ConfirmationModal from 'components/module/ConfirmationModal';
import Loading from 'components/module/Loading';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerCard from 'components/module/ProductSellerCard';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
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
  StyledTextField,
  RadioBtnContainer,
  Container,
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
    isLoadingAddCart,
    addCartItemData,
    showSuccessAddBtn,
    canNegotiate,
  } = props;
  const { isPreAuction, dateEnds } = productDetailsCard6Props;

  const [images, setImages] = useState<string[]>([]);
  const [negotiationPrice, setNegotiationPrice] = useState(0);
  const [newCurrentListing, setNewCurrentListing] = useState<
    GetListingResponseItem
  >();

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const cutOffDate = moment(productDetailsCard6Props?.dateEnds)
    .subtract(1, 'day')
    .endOf('day')
    .subtract(2, 'hours');

  const isBeyondCutoff =
    isPreAuction && dateEnds ? (moment() > cutOffDate ? true : false) : false;

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
    <Container>
      <ConfirmationModal
        isOpen
        onClickClose={() => {
          console.log('');
        }}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            0 Negotiation Credits
          </Typography>
        }
        action={() => {
          console.log('');
        }}
        actionText="See Plans"
        cancelText="Close"
        description={
          <div style={{ marginTop: 20 }}>
            <Typography variant="label" color="shade6">
              Upgrade your subscription plan to PULL NEXT TIER to get more negotiation credits.
            </Typography>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={false}
        onClickClose={() => {
          console.log('');
        }}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Confirm Negotiation
          </Typography>
        }
        action={() => {
          console.log('');
        }}
        actionText="Send Negotiation"
        cancelText="Cancel"
        description={
          <div style={{ marginTop: 20 }}>
            <Typography variant="label" color="shade6">
              Sending this negotiation will cost 1 Negotiation Credit.
            </Typography>
            <div style={{ marginTop: 10 }} />
            <Typography variant="label" color="shade6">
              Your current negotiation balance is X Credit.
            </Typography>
          </div>
        }
      />
      <ConfirmationModal
        isOpen={false}
        onClickClose={() => {
          console.log('');
        }}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Negotiate
          </Typography>
        }
        action={() => {
          console.log('');
        }}
        actionIconPosition="before"
        actionIcon={<MarketBoardOutlined width={20} height={20} />}
        actionText="Negotiate"
        hideCancel={true}
        description={
          <div style={{ marginTop: 20 }}>
            <StyledTextField
              type="number"
              inputType="decimal"
              step=".01"
              label={'Counter Offer'}
              value={negotiationPrice}
              onChangeText={(v) => {
                let price = v;
                if (price.indexOf('.') >= 0) {
                  price =
                    price.substr(0, price.indexOf('.')) +
                    price.substr(price.indexOf('.'), 3);
                }
                setNegotiationPrice(parseFloat(price));
              }}
              min={1}
              LeftComponent={
                <Typography variant="label" color="shade6">
                  {'$'}
                </Typography>
              }
              placeholder={`per ${unit}`}
              style={{ marginTop: 10 }}
            />
            <StyledTextField
              type="number"
              inputType="decimal"
              step=".01"
              label={'Desired Quantity'}
              value={negotiationPrice}
              onChangeText={(v) => {
                let price = v;
                if (price.indexOf('.') >= 0) {
                  price =
                    price.substr(0, price.indexOf('.')) +
                    price.substr(price.indexOf('.'), 3);
                }
                setNegotiationPrice(parseFloat(price));
              }}
              min={1}
              LeftComponent={
                <Typography variant="label" color="shade6">
                  {'kg'}
                </Typography>
              }
              placeholder={`per ${unit}`}
              style={{ marginTop: 16 }}
            />
            <div style={{ marginTop: 15 }} />
            <RadioBtnContainer>
              <div style={{ display: 'flex' }}>
                <Radio
                  checked
                  onClick={() => {
                    console.log('');
                  }}
                />
                <div style={{ marginRight: 27 }} />
                <Typography variant="caption" color="shade6">
                  10kg x 2
                </Typography>
              </div>
              <Typography variant="caption" color="shade6">
                20 kg
              </Typography>
            </RadioBtnContainer>
            <RadioBtnContainer>
              <div style={{ display: 'flex' }}>
                <Radio
                  checked
                  onClick={() => {
                    console.log('');
                  }}
                />
                <div style={{ marginRight: 27 }} />
                <Typography variant="caption" color="shade6">
                  10kg x 2
                </Typography>
              </div>
              <Typography variant="caption" color="shade6">
                20 kg
              </Typography>
            </RadioBtnContainer>
            <div style={{ marginTop: 24 }} />
            <Typography variant="caption" color="shade6">
              Seller&apos;s Negotiated Price
            </Typography>
            <div style={{ marginTop: 5 }} />
            <Typography variant="caption" color="shade6">
              Change in Price
            </Typography>
            <div style={{ marginTop: 5 }} />
            <Typography variant="caption" weight="bold" color="shade6">
              Total Product Value
            </Typography>
            {/* <BoxRadio
                id="id"
                checked={'id' === pressedBoxRadio}
                totalWeight={0}
                boxes={[
                  {
                    count: 0,
                    id: 'string',
                    quantity: 0,
                    weight: 0,
                  },
                ]}
                cost={0}
                unit={'kg'}
                onClick={
                  () => console.log('')
                  // setPressedBoxRadio((prevState) =>
                  //   p.id === prevState ? '' : p.id
                  // )
                }
              /> */}
          </div>
        }
      />
      {newCurrentListing !== undefined ? (
        <>
          <DetailsContainer>
            <Col xs={12} sm={12} md={12} lg={12} className="title">
              <TopBarContainer>
                <div>
                  <Typography
                    altFont={theme.isSFM}
                    variant="title4"
                    weight="500"
                  >
                    {productDetailsCard1Props.title}
                  </Typography>

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
                      <Expand width={18} height={18} fill={theme.grey.shade5} />
                    </div>
                    <Typography
                      color="shade9"
                      variant="label"
                      style={{ marginRight: 10 }}
                    >
                      {productDetailsCard1Props.size}
                    </Typography>
                    {productDetailsCard1Props.packaging && (
                      <>
                        <div style={{ marginLeft: 6 }}>
                          <Crate
                            width={18}
                            height={18}
                            fill={theme.grey.shade5}
                          />
                        </div>
                        <Typography
                          color="shade9"
                          variant="label"
                          style={{ marginLeft: 6 }}
                        >
                          Packed with {productDetailsCard1Props.packaging}
                        </Typography>
                      </>
                    )}
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
                            color={item.type === 'blue' ? 'noshade' : 'shade9'}
                          >
                            {item.label}
                          </BadgeText>
                        </Badge>
                      );
                    })}
                  </StatusContainer>
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
                      location={sellerRatingProps.companyLocation}
                      withBackground={false}
                      showFavoriteButton={false}
                      {...sellerRatingProps}
                      isPendingAccount={isPendingAccount}
                    />
                  ) : null
                }
                isPreAuction={productDetailsCard6Props?.isPreAuction}
                canNegotiate={canNegotiate}
              />
              {!isPendingAccount && isMobile ? (
                <ProductSellerCard
                  location={sellerRatingProps.companyLocation}
                  withBackground={false}
                  showFavoriteButton={true}
                  {...sellerRatingProps}
                  isPendingAccount={isPendingAccount}
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
                        placeholder={`Minimum Order: ${
                          productDetailsCard6Props.minOrder
                        } ${productDetailsCard6Props.unit ?? 'kg'}`}
                        disabled={isBeyondCutoff}
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
                    {addCartItemData?.data.items ? (
                      showSuccessAddBtn && (
                        <AddToCartButton
                          variant="success"
                          iconPosition="before"
                          icon={
                            <CheckFilled width={14} fill={theme.grey.noshade} />
                          }
                          textWeight="400"
                          textVariant="label"
                          text="Product added to cart!"
                        />
                      )
                    ) : (
                      <AddToCartButton
                        text={isLoadingAddCart ? '' : 'Add to cart'}
                        onClick={onAddToCart}
                        loading={isLoadingAddCart}
                        iconPosition="before"
                        icon={
                          <ShoppingTrolley
                            fill={
                              pressedBoxRadio
                                ? theme.grey.noshade
                                : theme.grey.shade5
                            }
                          />
                        }
                        variant={pressedBoxRadio ? undefined : 'disabled'}
                        disabled={isBeyondCutoff}
                      />
                    )}
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
