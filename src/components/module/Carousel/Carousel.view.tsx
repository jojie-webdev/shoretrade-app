import React from 'react';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarouselProps } from './Carousel.props';
import { Container, Image } from './Carousel.style';
SwiperCore.use([Navigation, Pagination]);

const Carousel = (props: CarouselProps): JSX.Element => {
  const { images, id } = props;
  return (
    <Container>
      <Swiper
        id={id}
        spaceBetween={50}
        tag="section"
        wrapperTag="ul"
        slidesPerView={1}
        loop={true}
        autoplay={true}
        // onSlideChange={() => {}}
        // onSwiper={(swiper) => {}}
        navigation
        pagination
      >
        {images &&
          images.map((image, key) => {
            return (
              <SwiperSlide key={key}>
                <Image
                  style={{
                    listStyle: 'none',
                  }}
                  src={image}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Container>
  );
};

export default React.memo(Carousel);
