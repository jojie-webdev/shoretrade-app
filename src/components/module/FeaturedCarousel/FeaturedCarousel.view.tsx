import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import CarouselChevronLeft from '../../base/SVG/CarouselChevronLeft';
import CarouselChevronRight from '../../base/SVG/CarouselChevronRight';
import { FeaturedCarouselProps } from './FeaturedCarousel.props';
import {
  ButtonLeft,
  ButtonRight,
  MainContainer,
  PreviewContainer,
  Preview,
} from './FeaturedCarousel.style';

const FeaturedCarousel = (props: FeaturedCarouselProps) => {
  // const theme = useTheme();
  const { slides } = props;
  const [start, setStart] = useState(0);

  const isControlsVisible = slides.length > 1;
  const visibleItems = isControlsVisible
    ? slides.concat(slides.slice(0, 1)).slice(start, start + 1)
    : slides;

  const onPrevClick = () => {
    start === 0 ? setStart(-100 * (slides.length - 1)) : setStart(start + 100);
    console.log(start);
  };
  const onNextClick = () => {
    start === -100 * (slides.length - 1) ? setStart(0) : setStart(start - 100);
    console.log(start);
  };

  return (
    <MainContainer>
      <ButtonLeft onClick={onPrevClick}>
        <CarouselChevronLeft />
      </ButtonLeft>

      {slides.map((slide, index) => (
        <PreviewContainer
          key={index}
          style={{ transform: `translateX(${start}%)` }}
        >
          <Preview src={slide} />
        </PreviewContainer>
      ))}

      <ButtonRight onClick={onNextClick}>
        <CarouselChevronRight />
      </ButtonRight>
    </MainContainer>
  );
};

export default React.memo(FeaturedCarousel);
