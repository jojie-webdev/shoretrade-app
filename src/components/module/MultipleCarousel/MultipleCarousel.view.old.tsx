import React, { useState, useRef } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTheme } from 'utils/Theme';

import { MultipleCarouselProps } from './MultipleCarousel.props';
import {
  ArrowArea,
  Container,
  EmptyContainer,
} from './MultipleCarousel.style.old';

function MultipleCarousel<D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  const theme = useTheme();
  const [currentNdx, setCurrentNdx] = useState(0);
  const containerWidthRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ query: BREAKPOINTS.sm });
  const isTabled = useMediaQuery({ query: BREAKPOINTS.genericTablet });

  const {
    id,
    Component,
    data,
    transform,
    link,
    breakpoints,
    onSlideChange,
    emptyText,
  } = props;

  function slidesPerView() {
    if (containerWidthRef.current) {
      const num =
        containerWidthRef.current.getBoundingClientRect().width / (265 + 32);
      return +num.toFixed(1);
    }

    return 1;
  }

  if (!data) {
    return <></>;
  }

  if (data.length === 0 && emptyText) {
    return (
      <EmptyContainer>
        <Typography variant="title5">{emptyText}</Typography>
      </EmptyContainer>
    );
  }

  const arrowColor =
    theme.appType === 'seller' ? theme.brand.primary : theme.grey.shade9;

  const showArrow = data.length > slidesPerView();

  return (
    <Container ref={containerWidthRef}>
      {showArrow && (
        <ArrowArea left>
          <Touchable
            onPress={() => ref.slideTo(currentNdx - slidesPerView())}
            circle
          >
            <CarouselChevronLeft width={18} height={18} fill={arrowColor} />
          </Touchable>
        </ArrowArea>
      )}

      <Swiper
        id={id}
        allowTouchMove={isTabled || isMobile ? true : false}
        onSwiper={(swiper) => {
          setRef(swiper);
        }}
        slidesPerView="auto"
        spaceBetween={32}
        style={{ width: '100%', padding: '8px 16px' }}
        onSlideChange={(swiper) => {
          setCurrentNdx(swiper.activeIndex);

          if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
          }
        }}
        breakpoints={breakpoints}
      >
        {data.map((d) => {
          if (!d.id) return null;

          return (
            <SwiperSlide key={d.id}>
              <Link to={link(d.id)} style={{ zIndex: 999 }}>
                <Component {...transform(d)} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {showArrow && (
        <ArrowArea right>
          <Touchable
            onPress={() => ref.slideTo(currentNdx + slidesPerView())}
            circle
          >
            <CarouselChevronRight width={18} height={18} fill={arrowColor} />
          </Touchable>
        </ArrowArea>
      )}
    </Container>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
