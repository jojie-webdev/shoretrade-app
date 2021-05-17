import React from 'react';

import { CarouselProps } from 'components/module/Carousel/Carousel.props';
import CarouselNew from 'components/module/Carousel/Carousel.view';
import CarouselOld from 'components/module/Carousel/Carousel.view.old';
import useHomeOld from 'utils/Hooks/useHomeOld';

const Carousel = (props: CarouselProps): JSX.Element => {
  const isOld = useHomeOld();

  return isOld ? <CarouselOld {...props} /> : <CarouselNew {...props} />;
};

export default Carousel;
