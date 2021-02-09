import React from 'react';

import { storiesOf } from '@storybook/react';

import GradientProgressCircle from '../../../src/components/module/GradientProgressCircle';
import Container from '../../components/Container';

storiesOf('module/GradientProgressCircle', module).add('Summary', () => (
  <Container>
    <GradientProgressCircle percentage={75} />
  </Container>
));
