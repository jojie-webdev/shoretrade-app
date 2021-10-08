import React from 'react';

import { storiesOf } from '@storybook/react';

import MarketRequestSummary from '../../../src/components/module/MarketRequestSummary';
import Container from '../../components/Container';

storiesOf('module/MarketRequestSummary', module).add('Summary', () => (
  <Container>
    <MarketRequestSummary />
  </Container>
));
