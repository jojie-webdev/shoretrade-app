import React, { useState } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { useTheme } from 'utils/Theme';
import { MultipleCarouselProps } from './MultipleCarousel.props';
import { Container, ArrowArea } from './MultipleCarousel.style';

function MultipleCarousel<T extends { id: string }, CP>(
  props: MultipleCarouselProps<T, CP>
) {
  const [ref, setRef] = useState<any>(null);
  // const theme = useTheme();

  const { Component, data, transform } = props;

  return (
    <>
      <ArrowArea left>
        <Touchable onPress={() => ref.slidePrev()}>
          <CarouselChevronLeft width={18} height={18} />
        </Touchable>
      </ArrowArea>
      <Swiper
        style={{ width: '100%' }}
        onSwiper={(ref) => setRef(ref)}
        slidesPerView={3}
        spaceBetween={16}
      >
        {data.map((d) => {
          return (
            <SwiperSlide key={d.id}>
              <Link to={`/buyer/product/${d.id}`}>
                <Component {...transform(d)} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ArrowArea right>
        <Touchable onPress={() => ref.slideNext(3)}>
          <CarouselChevronRight width={18} height={18} />
        </Touchable>
      </ArrowArea>
    </>
  );
}

export default MultipleCarousel;
