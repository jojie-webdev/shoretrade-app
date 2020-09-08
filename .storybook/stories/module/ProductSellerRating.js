import React from 'react';

import { storiesOf } from '@storybook/react';

import ProductSellerRating from '../../../src/components/module/ProductSellerRating';
import Container from '../../components/Container';

storiesOf('module/ProductSellerRating', module).add('Summary', () => (
  <Container>
    <ProductSellerRating />
  </Container>
));
