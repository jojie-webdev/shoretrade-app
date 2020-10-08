import React from 'react';

import { storiesOf } from '@storybook/react';

import ProductDetailCard from '../../../src/components/module/ProductDetailCard';
import Container from '../../components/Container';

const tags = [
  {
    label: 'Fresh',
  },
  {
    label: 'Farmed',
  },
  {
    label: 'Head on Gutted',
  },
];

storiesOf('module/ProductDetailCard', module).add('Summary', () => (
  <Container appType='buyer'>
    <ProductDetailCard 
      uri="https://picsum.photos/id/995/500/500.jpg"
      name="King Salmon Manuka Cold Smoked Sliced"
      price="1,4400.00"
      tags={tags}
      weight="12"
      unit="kg"
      size="Baby – Extra Large"
      location="NSW"
      vendor="Peter Manettas"
    />
  </Container>
));
