import React, { useState, useRef, useEffect } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTheme } from 'utils/Theme';

import { ResponsiveMultipleCarouselProps } from './ResponsiveMultiCarousel.props';
import {
  ArrowArea,
  Container,
  EmptyContainer,
} from './ResponsiveMultiCarousel.style';

SwiperCore.use([Pagination]);

function MultipleCarousel<D extends { id: string }, CP>(
  props: ResponsiveMultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  const theme = useTheme();
  const [currentNdx, setCurrentNdx] = useState(0);
  const containerWidthRef = useRef<HTMLDivElement | null>(null);

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isIpad = useMediaQuery({ query: BREAKPOINTS['iPad'] });

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

  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        ref.update();
      }, 1000);
    }
  }, [data]);

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

  const showPagination = data.length > slidesPerView();

  return (
    <Container ref={containerWidthRef}>
      {/* {showArrow && (
        <ArrowArea left>
          <Touchable
            onPress={() => ref.slideTo(currentNdx - slidesPerView())}
            circle
          >
            <CarouselChevronLeft width={18} height={18} fill={arrowColor} />
          </Touchable>
        </ArrowArea>
      )} */}

      <Swiper
        id={id}
        onSwiper={(swiper) => {
          setRef(swiper);
        }}
        pagination={{
          el: '.multiple-swiper-pagination',
        }}
        slidesPerView={isIpad || isSmallScreen ? 'auto' : 3}
        slidesPerColumn={isIpad || isSmallScreen ? 1 : 3}
        slidesPerColumnFill="row"
        spaceBetween={32}
        onSlideChange={(swiper) => {
          setCurrentNdx(swiper.activeIndex);

          if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
          }
        }}
        breakpoints={breakpoints}
      >
        {data.map((d) => {
          return (
            <SwiperSlide key={d.id}>
              <Link to={link(d.id)}>
                <Component {...transform(d)} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showPagination && <div className="multiple-swiper-pagination" />}
      {/* {showArrow && (
        <ArrowArea right>
          <Touchable
            onPress={() => ref.slideTo(currentNdx + slidesPerView())}
            circle
          >
            <CarouselChevronRight width={18} height={18} fill={arrowColor} />
          </Touchable>
        </ArrowArea>
      )} */}
    </Container>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
