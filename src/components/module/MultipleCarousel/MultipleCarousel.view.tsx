import React, { useState, useEffect } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { useTheme } from 'utils/Theme';
import { MultipleCarouselProps } from './MultipleCarousel.props';
import { ArrowArea } from './MultipleCarousel.style';

function MultipleCarousel<D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  // const theme = useTheme();
  const [currentNdx, setCurrentNdx] = useState(0);
  const { Component, data, transform, link } = props;

  const showThreeItems = useMediaQuery({
    query: '(max-width: 1480px)',
  });

  const showTwoItems = useMediaQuery({
    query: '(max-width: 1200px)',
  });

  const showOneItem = useMediaQuery({
    query: '(max-width: 650px)',
  });

  // These breakpoints are specific to home page, once this gets used
  // in another screen feel free to extract this code to make it more reusable
  function slidesPerView() {
    if (showOneItem) return 1;

    if (showTwoItems) return 2;

    if (showThreeItems) return 3;

    return 4;
  }

  return (
    <>
      <ArrowArea left>
        <Touchable onPress={() => ref.slideTo(currentNdx - slidesPerView())}>
          <CarouselChevronLeft width={18} height={18} />
        </Touchable>
      </ArrowArea>

      <Swiper
        onSwiper={(swiper) => {
          setRef(swiper);
        }}
        slidesPerView={1}
        spaceBetween={16}
        style={{ width: '100%' }}
        onSlideChange={(swiper) => setCurrentNdx(swiper.activeIndex)}
        // These breakpoints are specific to home page, once this gets used
        // in another screen feel free to extract this code to make it more reusable
        breakpoints={{
          1480: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 3,
          },
          650: {
            slidesPerView: 2,
          },
        }}
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

      <ArrowArea right>
        <Touchable onPress={() => ref.slideTo(currentNdx + slidesPerView())}>
          <CarouselChevronRight width={18} height={18} />
        </Touchable>
      </ArrowArea>
    </>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
