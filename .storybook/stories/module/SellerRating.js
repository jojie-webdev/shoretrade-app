import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerRating from '../../../src/components/module/SellerRating';
import Container from '../../components/Container';

storiesOf('module/SellerRating', module).add('without Image', () => (
  <Container appType="buyer">
    <SellerRating name="Seller Name Here" isFavorite={true} location="Earth" rating="2" onFavorite={() => {}} />
  </Container>
));


storiesOf('module/SellerRating', module).add('with Image', () => (
  <Container appType="buyer">
    <SellerRating
      uri="https://images.generated.photos/Xm1kjxyIRVKaGQWKUR1Zm-FX7GH0EzZ_M5y97YFZOwM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyODA5NDAuanBn.jpg"
      name="Seller Name Here"
      isFavorite={true}
      location="Earth"
      rating="4"
      onFavorite={() => {}}
    />
  </Container>
));
