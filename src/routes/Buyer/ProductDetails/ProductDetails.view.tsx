import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import BoxRadio from 'components/module/BoxRadio';
import FeaturedCarousel from 'components/module/FeaturedCarousel';
import ProductDetailsCard1View from 'components/module/ProductDetailsCard1';
import ProductDetailsCard6View from 'components/module/ProductDetailsCard6';
import ProductSellerRating from 'components/module/ProductSellerRating';
import { isEmpty } from 'ramda';
import { Col } from 'react-grid-system';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ProductDetailsGeneratedProps } from './ProductDetails.props';
import {
  Container,
  Image,
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

SwiperCore.use([Navigation, Pagination]);

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

  return (
    <Container>
      {currentListing !== undefined ? (
        <>
          <BannerContainer>
            <Swiper
              id="product-details"
              spaceBetween={50}
              tag="section"
              wrapperTag="ul"
              slidesPerView={1}
              loop={true}
              autoplay={true}
              // onSlideChange={() => {}}
              // onSwiper={(swiper) => {}}
              navigation
              pagination
            >
              {currentListing.images &&
                currentListing.images.map((image, key) => {
                  return (
                    <SwiperSlide key={key} style={{ width: '100%' }}>
                      <Image style={{ listStyle: 'none' }} src={image} />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            {/* <FeaturedCarousel
              previewClass="test"
              previewContainerClass="test"
              slides={currentListing.images}
            /> */}
          </BannerContainer>
          <Typography variant="label" className="description">
            {currentListing.description}
          </Typography>
          <DetailsContainer>
            <Col xs={6}>
              <ProductDetailsCard1View
                cBorderRadius="8px 0px 0px 0px"
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
              <DesiredQuantityContainer>
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
                <ButtonContainer>
                  {pressedBoxRadio ? (
                    <Button
                      style={{ float: 'right' }}
                      text="Add to Cart"
                      onClick={onAddToCard}
                    />
                  ) : (
                    <Button
                      style={{ float: 'right' }}
                      text="Add to Cart"
                      onClick={onAddToCard}
                      variant="disabled"
                    />
                  )}
                </ButtonContainer>
              </DesiredQuantityContainer>
            </Col>
          </DetailsContainer>
        </>
      ) : null}
    </Container>
  );
};

export default ProductDetailsView;
