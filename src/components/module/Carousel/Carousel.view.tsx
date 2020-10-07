import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import SwiperContainer from 'components/layout/SwiperContainer';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarouselProps } from './Carousel.props';
import { SwiperArea, ArrowArea, Image, ImageContainer } from './Carousel.style';

SwiperCore.use([Autoplay]);

const Carousel = (props: CarouselProps): JSX.Element => {
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
  } = props;
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const swiperItems = images.map((image) => {
    return (
      <SwiperSlide key={image}>
        <ImageContainer>
          <Image src={image} />
        </ImageContainer>
      </SwiperSlide>
    );
  });

  // initialize swiper
  // useful when image data comes from BE
  useEffect(() => {
    if (swiperRef) {
      setTimeout(() => {
        swiperRef.update();
      }, 1000);
    }
  }, [images]);

  const swiperAreaWidth =
    swiperWidth ||
    `calc(100% - ${arrowWidth ? `${arrowWidth * 2}px` : '200px'})`;
  const arrowAreaWidth = arrowWidth
    ? `${arrowWidth}px`
    : swiperWidth
    ? `calc((100% - ${swiperWidth})/2)`
    : 100;

  return (
    <SwiperContainer height={height}>
      {!hideArrowArea && (
        <ArrowArea
          style={{
            width: arrowAreaWidth,
            justifyContent: justifyArrows ? 'flex-start' : undefined,
          }}
        >
          {images.length > 2 && (
            <Touchable
              circle
              onPress={() => {
                if (swiperRef) {
                  swiperRef.slidePrev();
                }
              }}
            >
              {images.length > 1 ? (
                <CarouselChevronLeft width={18} height={18} />
              ) : null}
            </Touchable>
          )}
        </ArrowArea>
      )}
      <SwiperArea style={{ width: hideArrowArea ? '100%' : swiperAreaWidth }}>
        <Swiper
          id={id}
          spaceBetween={10}
          slidesPerView={1}
          loop={loop}
          autoplay={
            autoplay
              ? {
                  delay: 5000,
                }
              : undefined
          }
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
          }}
        >
          {swiperItems}
        </Swiper>
      </SwiperArea>
      {!hideArrowArea && (
        <ArrowArea
          style={{
            width: arrowAreaWidth,
            justifyContent: justifyArrows ? 'flex-end' : undefined,
          }}
        >
          {images.length > 2 && (
            <Touchable
              circle
              onPress={() => {
                if (swiperRef) {
                  swiperRef.slideNext();
                }
              }}
            >
              {images.length > 1 ? (
                <CarouselChevronRight width={18} height={18} />
              ) : null}
            </Touchable>
          )}
        </ArrowArea>
      )}
    </SwiperContainer>
  );
};

export default React.memo(Carousel);
