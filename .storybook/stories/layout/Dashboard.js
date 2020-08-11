import React from 'react';

import { storiesOf } from '@storybook/react';

import Dashboard from '../../../src/components/layout/Dashboard';
import Container from '../../components/Container';

storiesOf('layout/Dashboard', module).add('Summary', () => (
  <Container background="white">
    <Dashboard />
  </Container>
));
