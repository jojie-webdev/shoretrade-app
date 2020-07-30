import React from 'react';

import { storiesOf } from '@storybook/react';

import Dashboard from '../../../src/components/layout/Dashboard';
import Container from '../../components/Container';

storiesOf('module/Dashboard', module).add('Summary', () => (
  <Container>
    <Dashboard />
  </Container>
));
