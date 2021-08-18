import React from 'react';

import { storiesOf } from '@storybook/react';

import AnimatedOctopus from '../../../src/components/base/AnimatedOctopus';
import Container from '../../components/Container';

storiesOf('base/AnimatedOctopus', module).add('Summary', () => (
  <Container>
    <AnimatedOctopus />
  </Container>
));
