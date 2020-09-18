import React from 'react';

import { storiesOf } from '@storybook/react';

import MarketSectorItem from '../../../src/components/module/MarketSectorItem';
import Container from '../../components/Container';

export const MARKET_SECTORS = [
  'Hotel',
  'Restaurant',
  'Wholesaler',
  'Seafood Processor',
  'Retailer',
  'Wet Shop',
];

storiesOf('module/MarketSectorItem', module).add('Summary', () => (
  <Container>
    {MARKET_SECTORS.map((variant) => (
      <MarketSectorItem key={variant} variant={variant} onPress={() => null} />
    ))}
  </Container>
));
