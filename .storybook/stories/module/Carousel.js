import React from 'react';

import { storiesOf } from '@storybook/react';

import Carousel from '../../../src/components/module/Carousel';
import Container from '../../components/Container';

storiesOf('module/Carousel', module).add('Summary', () => (
  <Container>
    <Carousel />
  </Container>
));
