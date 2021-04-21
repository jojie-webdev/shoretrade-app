import React from 'react';

import { storiesOf } from '@storybook/react';

import Carousel from '../../../src/components/module/Carousel';
import Container from '../../components/Container';

storiesOf('module/Carousel', module).add('Summary', () => (
  <Container appType="buyer">
    <Carousel
      id="carousel"
      loop
      hideArrowArea
      autoplay
      images={[
        'https://picsum.photos/500/300.jpg',
        'https://picsum.photos/501/300.jpg',
        'https://picsum.photos/502/300.jpg',
      ]}
    />
  </Container>
));
