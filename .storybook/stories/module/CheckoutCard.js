import React from 'react';

import { storiesOf } from '@storybook/react';

import CheckoutCard from '../../../src/components/module/CheckoutCard';
import Container from '../../components/Container';

const props = {
  name: 'King Salmon Manuka Cold...',
  uri: 'https://picsum.photos/80',
  vendor: 'Peter Manettas',
  weight: '12',
  unit: 'Kg',
  size: 'Baby — Extra Large',
  price: '624.50',
};

storiesOf('module/CheckoutCard', module).add('Summary', () => (
  <Container background="white">
    <CheckoutCard {...props} />
  </Container>
));
