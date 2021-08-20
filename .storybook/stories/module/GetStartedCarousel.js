import React from 'react';

import { storiesOf } from '@storybook/react';

import GetStartedCarousel from '../../../src/components/module/GetStartedCarousel';
import Container from '../../components/Container';

storiesOf('module/GetStartedCarousel', module).add('Summary', () => (
  <Container>
    <GetStartedCarousel />
  </Container>
));
