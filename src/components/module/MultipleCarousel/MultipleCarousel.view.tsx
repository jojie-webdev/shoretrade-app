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

import { MultipleCarouselProps } from './MultipleCarousel.props';
import { ArrowArea, Container, EmptyContainer } from './MultipleCarousel.style';

SwiperCore.use([Pagination]);

function MultipleCarousel<D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  const theme = useTheme();
  const [currentNdx, setCurrentNdx] = useState(0);
  const containerWidthRef = useRef<HTMLDivElement | null>(null);

  const {
    id,
    Component,
    data,
    transform,
    link,
    breakpoints,
    onSlideChange,
    emptyText,
    responsive = false,
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
      <Swiper
        id={id}
        onSwiper={(swiper) => {
          setRef(swiper);
        }}
        pagination={{
          el: '.multiple-swiper-pagination',
        }}
        slidesPerView="auto"
        slidesPerColumnFill="row"
        spaceBetween={32}
        style={{ width: '100%', padding: '8px 16px' }}
        onSlideChange={(swiper) => {
          setCurrentNdx(swiper.activeIndex);

          if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
          }
        }}
        breakpoints={
          !responsive
            ? {}
            : {
                // when window width is >= 320px
                375: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                  slidesPerColumn: 1,
                  slidesPerColumnFill: 'row',
                },
                576: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                  slidesPerColumn: 1,
                },
                // when window width is >= 480px
                768: {
                  slidesPerView: 3,
                  slidesPerColumn: undefined,
                  spaceBetween: 30,
                },
                // when window width is >= 640px
                992: {
                  slidesPerView: 3,
                  slidesPerColumn: 3,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 2,
                  slidesPerColumn: 3,
                  spaceBetween: 10,
                },
                1366: {
                  slidesPerView: 3,
                  slidesPerColumn: 3,
                  spaceBetween: 10,
                },
              }
        }
      >
        {data.map((d) => {
          return (
            <SwiperSlide key={d.id}>
              <Link to={link(d.id)}>
                <Component responsive {...transform(d)} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {showPagination && <div className="multiple-swiper-pagination" />}
    </Container>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
