import React from 'react';

import { storiesOf } from '@storybook/react';

import AnimatedSwordfish from '../../../src/components/base/AnimatedSwordfish';
import Container from '../../components/Container';

storiesOf('base/AnimatedSwordfish', module).add('Summary', () => (
  <Container>
    <AnimatedSwordfish />
  </Container>
));
