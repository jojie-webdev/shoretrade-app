import React from 'react';

import { storiesOf } from '@storybook/react';

import LoadingOverlay from '../../../src/components/module/LoadingOverlay';
import Container from '../../components/Container';

storiesOf('module/LoadingOverlay', module).add('Summary', () => (
  <Container>
    <LoadingOverlay />
  </Container>
));
