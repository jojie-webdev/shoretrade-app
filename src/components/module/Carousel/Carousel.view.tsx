import React, { useEffect, useState } from 'react';

import Badge from 'components/base/Badge';
import Typography from 'components/base/Typography';
import SwiperContainer from 'components/layout/SwiperContainer';
import { CarouselProps } from 'components/module/Carousel/Carousel.props';
import {
  SwiperArea,
  ArrowArea,
  Image,
  ImageContainer,
  LeftInsideArrowArea,
  RightInsideArrowArea,
  ArrowButton,
  PaginationArea,
  BadgeContainer,
  ActionButtonContainer,
  ThumbNavContainer,
  ThumbNav,
} from 'components/module/Carousel/Carousel.style';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTheme } from 'utils/Theme';

SwiperCore.use([Autoplay, Pagination]);

const Carousel = (props: CarouselProps): JSX.Element => {
  const theme = useTheme();

  const {
    images,
    id,
    height,
    swiperWidth,
    loop,
    autoplay,
    arrowWidth,
    justifyArrows,
    hideArrowArea,
    aspectRatio = '8:7',
    addMargin,
    arrowInside,
    showAquafuture,
    showAlmostGone,
    showActionButton,
    actionButton,
    variant = 'bullet',
  } = props;
  const [swiperRef, setSwiperRef] = useState<any>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<any>(0);

  const swiperItems = images.map((image) => {
    return (
      <SwiperSlide key={image}>
        <ImageContainer img={image} aspectRatio={aspectRatio} />
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
  }, [showSwiperItems]);

  const swiperAreaWidth =
    swiperWidth ||
    `calc(100% - ${arrowWidth ? `${arrowWidth * 2}px` : '200px'})`;
  const arrowAreaWidth = arrowWidth
    ? `${arrowWidth}px`
    : swiperWidth
    ? `calc((100% - ${swiperWidth})/2)`
    : 100;

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
              <Badge badgeColor={theme.grey.shade8}>
                <Typography color="shade4" variant="overline">
                  Aquafuture
                </Typography>
              </Badge>
            )}
            {showAlmostGone && (
              <Badge badgeColor={theme.brand.warning}>
                <Typography style={{ color: '#FFF1E9' }} variant="overline">
                  Almost Gone!
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
              console.log(swiper.activeIndex);
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
            <Badge badgeColor={theme.grey.shade8}>
              <Typography color="shade4" variant="overline">
                Aquafuture
              </Typography>
            </Badge>
          )}
          {showAlmostGone && (
            <Badge badgeColor={theme.brand.warning}>
              <Typography style={{ color: '#FFF1E9' }} variant="overline">
                Almost Gone!
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
