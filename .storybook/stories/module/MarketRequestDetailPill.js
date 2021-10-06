import React from 'react';

import { storiesOf } from '@storybook/react';

import MarketRequestDetailPill from '../../../src/components/module/MarketRequestDetailPill';
import Container from '../../components/Container';

storiesOf('module/MarketRequestDetailPill', module).add('Summary', () => (
  <Container>
    <MarketRequestDetailPill />
  </Container>
));
