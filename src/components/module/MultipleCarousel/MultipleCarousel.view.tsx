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
        slidesPerView={1.2}
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
            1480: {
              slidesPerView: 4.35,
            },
            1320: {
              slidesPerView: 3.5,
            },
            1240: {
              slidesPerView: 3.2,
            },
            768: {
              slidesPerView: 2.1,
            },
            650: {
              slidesPerView: 1.3,
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
