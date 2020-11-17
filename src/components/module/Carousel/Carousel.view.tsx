import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import SwiperContainer from 'components/layout/SwiperContainer';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarouselProps } from './Carousel.props';
import {
  SwiperArea,
  ArrowArea,
  Image,
  ImageContainer,
  LeftInsideArrowArea,
  RightInsideArrowArea,
  ArrowButton,
} from './Carousel.style';

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
    aspectRatio = '16:9',
    addMargin,
    arrowInside,
  } = props;
  const [swiperRef, setSwiperRef] = useState<any>(null);

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

  const hideOutsideArrows = arrowInside || hideArrowArea || false;
  return (
    <SwiperContainer
      height={height}
      aspectRatio={aspectRatio}
      addMargin={addMargin}
      onResize={() => {
        setShowSwiperItems(false);
      }}
    >
      {!hideOutsideArrows && (
        <ArrowArea
          style={{
            width: arrowAreaWidth,
            justifyContent: justifyArrows ? 'flex-start' : undefined,
          }}
        >
          {images.length > 1 && (
            <Touchable
              circle
              onPress={() => {
                if (swiperRef) {
                  swiperRef.slidePrev();
                }
              }}
            >
              <CarouselChevronLeft width={18} height={18} />
            </Touchable>
          )}
        </ArrowArea>
      )}
      <SwiperArea
        style={{
          width: hideOutsideArrows ? '100%' : swiperAreaWidth,
        }}
      >
        {arrowInside && (
          <>
            <LeftInsideArrowArea>
              <ArrowButton
                onClick={() => {
                  if (swiperRef) {
                    swiperRef.slidePrev();
                  }
                }}
              >
                <CarouselChevronLeft width={14} height={14} />
              </ArrowButton>
            </LeftInsideArrowArea>
            <RightInsideArrowArea>
              <ArrowButton
                onClick={() => {
                  if (swiperRef) {
                    swiperRef.slideNext();
                  }
                }}
              >
                <CarouselChevronRight width={14} height={14} />
              </ArrowButton>
            </RightInsideArrowArea>
          </>
        )}
        <Swiper
          id={id}
          spaceBetween={10}
          slidesPerView={1}
          loop={loop && images.length > 1}
          initialSlide={0}
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
      </SwiperArea>
      {!hideOutsideArrows && (
        <ArrowArea
          style={{
            width: arrowAreaWidth,
            justifyContent: justifyArrows ? 'flex-end' : undefined,
          }}
        >
          {images.length > 1 && (
            <Touchable
              circle
              onPress={() => {
                if (swiperRef) {
                  swiperRef.slideNext();
                }
              }}
            >
              <CarouselChevronRight width={18} height={18} />
            </Touchable>
          )}
        </ArrowArea>
      )}
    </SwiperContainer>
  );
};

export default React.memo(Carousel);
