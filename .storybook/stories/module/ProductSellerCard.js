import React from 'react';

import { storiesOf } from '@storybook/react';

import ProductSellerCard from '../../../src/components/module/ProductSellerCard';
import Container from '../../components/Container';

storiesOf('module/ProductSellerCard', module).add('Summary', () => (
  <Container>
    <ProductSellerCard />
  </Container>
));
