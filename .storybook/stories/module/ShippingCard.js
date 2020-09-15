import React from 'react';

import { storiesOf } from '@storybook/react';

import ShippingCard from '../../../src/components/module/ShippingCard';
import Container from '../../components/Container';

const options = [
  {
    priceId: '1',
    name: 'Road freight delivery to door',
    est: 'Est. delivery: 21 Apr',
    price: '22.00',
  },
  {
    priceId: '2',
    name: 'Road freight pickup at airport',
    est: 'Est. delivery: 23 Apr – 24 Apr',
    price: '84.70',
  },
];

storiesOf('module/ShippingCard', module).add('Summary', () => (
  <Container background="white">
    <ShippingCard
      selectedPriceId={1}
      options={options}
      onPress={(option) => {
        console.log(option);
      }}
    />
  </Container>
));
