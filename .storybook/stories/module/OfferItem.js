import React from 'react';

import { storiesOf } from '@storybook/react';

import OfferItem from '../../../src/components/module/OfferItem';
import Container from '../../components/Container';

const mockSellerOffer = {
  offers: [],
};

storiesOf('module/OfferItem', module).add('Summary', () => (
  <Container>
    <OfferItem sellerOffer={mockSellerOffer} />
  </Container>
));
