import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Badge from 'components/base/Badge';
import { Ellipse } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import SwiperContainer from 'components/layout/SwiperContainer';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CarouselV2Props } from './CarouselV2.props';
import {
  SwiperArea,
  ArrowArea,
  Image,
  ImageContainer,
  LeftInsideArrowArea,
  RightInsideArrowArea,
  ArrowButton,
  PaginationArea,
  BadgeContainer,
} from './CarouselV2.style';

SwiperCore.use([Autoplay, Pagination]);

const CarouselV2 = (props: CarouselV2Props): JSX.Element => {
  const {
    images,
    id,
    height,
    swiperWidth,
    loop,
    autoplay,
    arrowWidth,
    justifyArrows,
    hideArrowArea,
    aspectRatio = '16:9',
    addMargin,
    arrowInside,
    showAquafuture,
    showAlmostGone,
  } = props;
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const swiperItems = images.map((image) => {
    return (
      <SwiperSlide key={image}>
        <ImageContainer img={image} aspectRatio={aspectRatio} />
      </SwiperSlide>
    );
  });

  const [showSwiperItems, setShowSwiperItems] = useState(true);

  // initialize swiper
  // useful when image data comes from BE
  useEffect(() => {
    if (swiperRef) {
      setTimeout(() => {
        swiperRef.update();
      }, 1000);
    }
  }, [images]);

  // logic to rerender the items,
  // this allows images to resize properly
  useEffect(() => {
    if (!showSwiperItems) {
      setShowSwiperItems(true);
    } else {
      if (swiperRef) {
        swiperRef.update();
      }
    }
  }, [showSwiperItems]);

  const swiperAreaWidth =
    swiperWidth ||
    `calc(100% - ${arrowWidth ? `${arrowWidth * 2}px` : '200px'})`;
  const arrowAreaWidth = arrowWidth
    ? `${arrowWidth}px`
    : swiperWidth
    ? `calc((100% - ${swiperWidth})/2)`
    : 100;

  if (images.length === 0) {
    return <></>;
  }

  // const CustomPagination = (props: PA)

  const hideOutsideArrows = arrowInside || hideArrowArea || false;
  return (
    <SwiperContainer
      height={height}
      aspectRatio={aspectRatio}
      addMargin={addMargin}
      onResize={() => {
        setShowSwiperItems(false);
      }}
    >
      <SwiperArea>
        <BadgeContainer>
          {showAquafuture && (
            <Badge badgeColor="#111E2B">
              <Typography color="shade4" variant="overline">
                Aquafuture
              </Typography>
            </Badge>
          )}
          {showAlmostGone && (
            <Badge badgeColor="#FFA26B">
              <Typography style={{ color: '#FFF1E9' }} variant="overline">
                Almost Gone!
              </Typography>
            </Badge>
          )}
        </BadgeContainer>
        <Swiper
          id={id}
          spaceBetween={10}
          slidesPerView={1}
          loop={loop && images.length > 1}
          initialSlide={0}
          pagination={{
            el: '.swiper-pagination',
            renderCustom: (swiper, current, total) => {
              return current + ' of ' + total;
            },
          }}
          autoplay={
            images.length !== 0 && autoplay
              ? {
                  delay: 5000,
                }
              : undefined
          }
          onSwiper={(swiper) => {
            setSwiperRef(swiper);
          }}
        >
          {showSwiperItems && swiperItems}
        </Swiper>
        {
          images.length > 1 && (
            <div className="swiper-pagination"></div>
          )
        }
      </SwiperArea>
    </SwiperContainer>
  );
};

export default React.memo(CarouselV2);
