import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import CarouselChevronLeft from '../../base/SVG/CarouselChevronLeft';
import CarouselChevronRight from '../../base/SVG/CarouselChevronRight';
import { FeaturedCarouselProps } from './FeaturedCarousel.props';
import {
  Button,
  MainContainer,
  PreviewContainer,
} from './FeaturedCarousel.style';

const FeaturedCarousel = (props: FeaturedCarouselProps) => {
  // const theme = useTheme();
  const { slides, children } = props;
  const [start, setStart] = useState(0);

  const isControlsVisible = slides.length > 1;
  const visibleItems = isControlsVisible
    ? slides.concat(slides.slice(0, 1)).slice(start, start + 1)
    : slides;

  const onNextClick = () => {
    setStart(start + 1 >= slides.length ? 0 : start + 1);
    console.log('next');
  };

  const onPrevClick = () => {
    setStart(start - 1 >= 0 ? start - 1 : slides.length - 1);
    console.log('prev');
  };

  return (
    <MainContainer>
      {isControlsVisible && (
        <Button onClick={onPrevClick}>
          <CarouselChevronLeft />
        </Button>
      )}

      <PreviewContainer>
        {visibleItems.map((slide: any) => (children ? children(slide) : null))}
      </PreviewContainer>

      {isControlsVisible && (
        <Button onClick={onNextClick}>
          <CarouselChevronRight />
        </Button>
      )}
    </MainContainer>
  );
};

export default React.memo(FeaturedCarousel);
