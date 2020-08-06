import React from 'react';

import { storiesOf } from '@storybook/react';

import EmptyState from '../../../src/components/module/EmptyState';
import Container from '../../components/Container';

storiesOf('module/EmptyState', module).add('Summary', () => (
  <Container>
    <EmptyState />
  </Container>
));
