import React from 'react';

import { storiesOf } from '@storybook/react';

import MultipleCarousel from '../../../src/components/module/MultipleCarousel';
import Container from '../../components/Container';

storiesOf('module/MultipleCarousel', module).add('Summary', () => (
  <Container>
    <MultipleCarousel />
  </Container>
));
