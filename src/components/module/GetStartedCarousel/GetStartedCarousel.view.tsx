import React from 'react';

import { Player } from '@lottiefiles/react-lottie-player';

import { GetStartedCarouselProps } from './GetStartedCarousel.props';
import { Container } from './GetStartedCarousel.style';

const GetStartedCarousel = (props: GetStartedCarouselProps): JSX.Element => {
  const { image, style, ...playerProps } = props;

  return (
    <Container>
      <Player autoplay loop src={image} style={style} {...playerProps} />
    </Container>
  );
};

export default React.memo(GetStartedCarousel);
