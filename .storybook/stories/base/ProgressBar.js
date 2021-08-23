import React from 'react';

import { storiesOf } from '@storybook/react';

import ProgressBar from '../../../src/components/base/ProgressBar';
import Container from '../../components/Container';

storiesOf('base/ProgressBar', module).add('Summary', () => (
  <Container>
    <ProgressBar />
  </Container>
));
