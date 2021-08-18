import React from 'react';

import { storiesOf } from '@storybook/react';

import AnimatedAnchor from '../../../src/components/base/AnimatedAnchor';
import Container from '../../components/Container';

storiesOf('base/AnimatedAnchor', module).add('Summary', () => (
  <Container>
    <AnimatedAnchor />
  </Container>
));
