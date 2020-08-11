import React from 'react';

import { storiesOf } from '@storybook/react';

import InnerRouteHeader from '../../../src/components/module/InnerRouteHeader';
import Container from '../../components/Container';

storiesOf('module/InnerRouteHeader', module).add('Summary', () => (
  <Container backgroundColor="#111E2B">
    <InnerRouteHeader title="Confirm Weight" />
  </Container>
));
