import React from 'react';

import { storiesOf } from '@storybook/react';

import AnimationPlayer from '../../../src/components/base/AnimationPlayer';
import Container from '../../components/Container';

storiesOf('base/AnimationPlayer', module).add('Summary', () => (
  <Container>
    <AnimationPlayer />
  </Container>
));
