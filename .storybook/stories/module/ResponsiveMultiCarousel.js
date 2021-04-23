import React from 'react';

import { storiesOf } from '@storybook/react';

import ResponsiveMultiCarousel from '../../../src/components/module/ResponsiveMultiCarousel';
import Container from '../../components/Container';

storiesOf('module/ResponsiveMultiCarousel', module).add('Summary', () => (
  <Container>
    <ResponsiveMultiCarousel />
  </Container>
));
