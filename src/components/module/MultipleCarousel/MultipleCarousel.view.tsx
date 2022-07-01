import React, { useState, useRef, useEffect } from 'react';

import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { MultipleCarouselProps } from './MultipleCarousel.props';
import { Container, EmptyContainer } from './MultipleCarousel.style';

SwiperCore.use([Pagination]);

function MultipleCarousel<D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  // eslint-disable-next-line
  const [currentNdx, setCurrentNdx] = useState(0);
  const containerWidthRef = useRef<HTMLDivElement | null>(null);

  const {
    id,
    Component,
    data,
    transform,
    link,
    onSlideChange,
    emptyText,
    responsive = false,
  } = props;

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        ref.update();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [data]);

  function slidesPerView() {
    if (containerWidthRef.current) {
      const num =
        containerWidthRef.current.getBoundingClientRect().width / (265 + 16);
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

  const showPagination = data.length > slidesPerView();

  const freeMode = isMobile ? true : false;

  return (
    <Container ref={containerWidthRef}>
      <Swiper
        id={id}
        freeMode={freeMode}
        onSwiper={(swiper) => {
          setRef(swiper);
        }}
        pagination={{
          el: '.multiple-swiper-pagination',
        }}
        slidesPerView="auto"
        slidesPerColumnFill="row"
        spaceBetween={16}
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
                  spaceBetween: 15,
                  slidesPerColumn: 1,
                  slidesPerColumnFill: 'row',
                },
                576: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  slidesPerColumn: 1,
                },
                // when window width is >= 480px
                768: {
                  slidesPerView: 3,
                  slidesPerColumn: undefined,
                  spaceBetween: 15,
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
      {showPagination && <div className="multiple-swiper-pagination" />}
    </Container>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
