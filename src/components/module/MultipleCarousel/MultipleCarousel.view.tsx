import React, { useState } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// import { useTheme } from 'utils/Theme';
import { MultipleCarouselProps } from './MultipleCarousel.props';
import { ArrowArea } from './MultipleCarousel.style';

function MultipleCarousel<T extends { id: string }, CP>(
  props: MultipleCarouselProps<T, CP>
) {
  const [ref, setRef] = useState<any>(null);
  // const theme = useTheme();

  const { Component, data, transform, link, slidesPerView } = props;

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
        slidesPerView={slidesPerView || 4}
        spaceBetween={16}
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
        <Touchable onPress={() => ref.slideNext()}>
          <CarouselChevronRight width={18} height={18} />
        </Touchable>
      </ArrowArea>
    </>
  );
}

// Needed so we can pass generics to a memoized component
export default React.memo(MultipleCarousel) as typeof MultipleCarousel;
