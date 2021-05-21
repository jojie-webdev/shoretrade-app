import React from 'react';

import { storiesOf } from '@storybook/react';

import MarketRequestOfferFilterModal from '../../../src/components/module/MarketRequestOfferFilterModal';
import Container from '../../components/Container';

storiesOf('module/MarketRequestOfferFilterModal', module).add('Summary', () => (
  <Container>
    <MarketRequestOfferFilterModal />
  </Container>
));
