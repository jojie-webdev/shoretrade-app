import React, { useEffect, useState } from 'react';

import Badge from 'components/base/Badge';
import Typography from 'components/base/Typography';
import SwiperContainer from 'components/layout/SwiperContainer';
import {
  SwiperArea,
  ImageContainer,
  BadgeContainer,
  ActionButtonContainer,
  ThumbNavContainer,
  ThumbNav,
} from 'components/module/Carousel/Carousel.style';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { CarouselProps } from './Carousel.props';

SwiperCore.use([Autoplay, Pagination]);

const Carousel = (props: CarouselProps): JSX.Element => {
  const theme = useTheme();

  const {
    images,
    id,
    height,
    loop,
    autoplay,
    aspectRatio = '16:9',
    addMargin,
    showAquafuture,
    showAlmostGone,
    showAlwaysAvailable,
    showActionButton,
    actionButton,
    variant = 'bullet',
    bgPosition,
  } = props;
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(0);

  const swiperItems = images.map((image) => {
    return (
      <SwiperSlide key={image}>
        <ImageContainer
          img={parseImageUrl(image)}
          aspectRatio={aspectRatio}
          bgPosition={bgPosition}
        />
      </SwiperSlide>
    );
  });

  const [showSwiperItems, setShowSwiperItems] = useState(true);

  // initialize swiper
  // useful when image data comes from BE
  useEffect(() => {
    if (swiperRef) {
      setTimeout(() => {
        swiperRef.update();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [images]);

  // logic to rerender the items,
  // this allows images to resize properly
  useEffect(() => {
    if (!showSwiperItems) {
      setShowSwiperItems(true);
    } else {
      if (swiperRef) {
        swiperRef.update();
      }
    }
    // eslint-disable-next-line
  }, [showSwiperItems]);

  if (images.length === 0) {
    return <></>;
  }

  if (variant === 'thumbnail') {
    return (
      <SwiperContainer
        height={height}
        aspectRatio={aspectRatio}
        addMargin={addMargin}
        onResize={() => {
          setShowSwiperItems(false);
        }}
        variant={variant}
      >
        <SwiperArea>
          <BadgeContainer>
            {showAquafuture && (
              <Badge className="badge" badgeColor={theme.grey.shade8}>
                <Typography color="shade4" variant="overline">
                  Aquafuture
                </Typography>
              </Badge>
            )}
            {showAlmostGone && (
              <Badge className="badge" badgeColor={theme.brand.warning}>
                <Typography color="noshade" variant="overline">
                  Almost Gone!
                </Typography>
              </Badge>
            )}
            {showAlwaysAvailable && (
              <Badge className="badge" badgeColor={theme.brand.success}>
                <Typography color="noshade" variant="overline">
                  Next Day Shipment
                </Typography>
              </Badge>
            )}
          </BadgeContainer>
          <Swiper
            preloadImages={false}
            lazy={true}
            pagination={{
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true,
            }}
            loop={false}
            spaceBetween={30}
            onSwiper={(swiper) => {
              setSwiperRef(swiper);
            }}
            onSlideChange={(swiper) => {
              swiper.update();
            }}
          >
            {swiperItems}
          </Swiper>
          <ThumbNavContainer>
            {images.map((image, idx) => (
              <ThumbNav
                active={swiperRef && activeSlideIndex === idx}
                onClick={() => {
                  swiperRef.slideTo(idx, 1000);
                  setActiveSlideIndex(idx);
                }}
                key={image}
                className="swiper-lazy"
                src={image}
              />
            ))}
          </ThumbNavContainer>
        </SwiperArea>
      </SwiperContainer>
    );
  }

  return (
    <SwiperContainer
      height={height}
      aspectRatio={aspectRatio}
      addMargin={addMargin}
      onResize={() => {
        setShowSwiperItems(false);
      }}
      variant="bullet"
    >
      <SwiperArea>
        <ActionButtonContainer>
          {showActionButton ? actionButton : ''}
        </ActionButtonContainer>

        <BadgeContainer>
          {showAquafuture && (
            <Badge className="badge" badgeColor={theme.grey.shade8}>
              <Typography color="shade4" variant="overline">
                Aquafuture
              </Typography>
            </Badge>
          )}
          {showAlmostGone && (
            <Badge className="badge" badgeColor={theme.brand.warning}>
              <Typography color="noshade" variant="overline">
                Almost Gone!
              </Typography>
            </Badge>
          )}
          {showAlwaysAvailable && (
            <Badge className="badge" badgeColor={theme.brand.success}>
              <Typography color="noshade" variant="overline">
                Next Day Shipment
              </Typography>
            </Badge>
          )}
        </BadgeContainer>
        <Swiper
          id={id}
          spaceBetween={10}
          slidesPerView={1}
          loop={loop && images.length > 1}
          initialSlide={0}
          pagination={{
            el: '.swiper-pagination',
          }}
          autoplay={
            images.length !== 0 && autoplay
              ? {
                  delay: 5000,
                }
              : undefined
          }
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
          }}
        >
          {showSwiperItems && swiperItems}
        </Swiper>
        {images.length > 1 && <div className="swiper-pagination" />}
      </SwiperArea>
    </SwiperContainer>
  );
};

export default React.memo(Carousel);
