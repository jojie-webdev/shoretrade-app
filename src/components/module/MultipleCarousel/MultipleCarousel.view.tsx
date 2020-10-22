import React, { useState } from 'react';

import { CarouselChevronLeft, CarouselChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTheme } from 'utils/Theme';

import { MultipleCarouselProps } from './MultipleCarousel.props';
import { ArrowArea, Container, EmptyContainer } from './MultipleCarousel.style';

function MultipleCarousel<D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
) {
  const [ref, setRef] = useState<any>(null);
  const theme = useTheme();
  const [currentNdx, setCurrentNdx] = useState(0);
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
    <Container>
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
        onSwiper={(swiper) => {
          setRef(swiper);
          swiper.update();
        }}
        slidesPerView={1.05}
        spaceBetween={16}
        style={{ width: '100%', padding: '8px 16px' }}
        onSlideChange={(swiper) => {
          setCurrentNdx(swiper.activeIndex);

          if (onSlideChange) {
            onSlideChange(swiper.activeIndex);
          }
        }}
        // These breakpoints are specific to home page, once this gets used
        // in another screen feel free to extract this code to make it more reusable
        breakpoints={
          breakpoints || {
            1800: {
              slidesPerView: 4.2,
            },
            1740: {
              slidesPerView: 4,
            },
            1600: {
              slidesPerView: 3.8,
            },
            1400: {
              slidesPerView: 3,
            },
            1300: {
              slidesPerView: 2.8,
            },
            1250: {
              slidesPerView: 2.5,
            },
            1200: {
              slidesPerView: 2.4,
            },
            1136: {
              slidesPerView: 2.3,
            },
            1110: {
              slidesPerView: 2.2,
            },
            1090: {
              slidesPerView: 2.1,
            },
            1057: {
              slidesPerView: 2,
            },
            1029: {
              slidesPerView: 1.9,
            },
            1001: {
              slidesPerView: 1.8,
            },
            973: {
              slidesPerView: 1.7,
            },
            945: {
              slidesPerView: 1.6,
            },
            917: {
              slidesPerView: 1.5,
            },
            888: {
              slidesPerView: 1.4,
            },
            850: {
              slidesPerView: 1.3,
            },
            832: {
              slidesPerView: 1.2,
            },
            804: {
              slidesPerView: 1.1,
            },
            790: {
              slidesPerView: 1,
            },
            577: {
              slidesPerView: 1.1,
            },
            569: {
              slidesPerView: 1.2,
            },
            540: {
              slidesPerView: 1.6,
            },
            500: {
              slidesPerView: 1.45,
            },
            480: {
              slidesPerView: 1.35,
            },
            460: {
              slidesPerView: 1.3,
            },
            425: {
              slidesPerView: 1.2,
            },
          }
        }
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
