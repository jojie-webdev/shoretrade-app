import React from 'react';

import { storiesOf } from '@storybook/react';

import AnimatedCrab from '../../../src/components/base/AnimatedCrab';
import Container from '../../components/Container';

storiesOf('base/AnimatedCrab', module).add('Summary', () => (
  <Container>
    <AnimatedCrab />
  </Container>
));
