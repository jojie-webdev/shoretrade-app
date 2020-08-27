import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerRating from '../../../src/components/module/SellerRating';
import Container from '../../components/Container';

storiesOf('module/SellerRating', module).add('without Image', () => (
  <Container appType="buyer">
    <SellerRating
      id="x"
      companyImage=""
      companyName="Seller Name Here"
      companyLocation={{ state: '', countryCode: '' }}
      isFavourite={true}
      rating="2"
      onFavorite={() => {}}
    />
  </Container>
));


storiesOf('module/SellerRating', module).add('with Image', () => (
  <Container appType="buyer">
    <SellerRating
      id="x"
      companyImage="https://images.generated.photos/Xm1kjxyIRVKaGQWKUR1Zm-FX7GH0EzZ_M5y97YFZOwM/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyODA5NDAuanBn.jpg"
      companyName="Seller Name Here"
      companyLocation={{ state: 'Sydney', countryCode: 'AU' }}
      isFavourite={true}
      rating="4"
      onFavorite={() => {}}
    />
  </Container>
));
