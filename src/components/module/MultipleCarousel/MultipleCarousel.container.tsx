import React from 'react';

import { MultipleCarouselProps } from 'components/module/MultipleCarousel/MultipleCarousel.props';
import MultipleCarouselNew from 'components/module/MultipleCarousel/MultipleCarousel.view';
import MultipleCarouselOld from 'components/module/MultipleCarousel/MultipleCarousel.view.old';
import useHomeOld from 'utils/Hooks/useHomeOld';

const MultipleCarousel = <D extends { id: string }, CP>(
  props: MultipleCarouselProps<D, CP>
): JSX.Element => {
  const isOld = useHomeOld();

  return isOld ? (
    <MultipleCarouselOld {...props} />
  ) : (
    <MultipleCarouselNew {...props} />
  );
};

export default MultipleCarousel;
