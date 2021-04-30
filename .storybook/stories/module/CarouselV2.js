import React from 'react';

import { storiesOf } from '@storybook/react';

import CarouselV2 from '../../../src/components/module/Carousel';
import Container from '../../components/Container';

storiesOf('module/CarouselV2', module).add('Summary', () => (
  <Container appType="buyer">
    <CarouselV2
      id="carousel"
      loop
      autoplay
      images={['https://picsum.photos/502/300.jpg']}
    />
  </Container>
));
