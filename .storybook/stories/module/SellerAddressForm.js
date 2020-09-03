import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerAddressForm from '../../../src/components/module/SellerAddressForm';
import Container from '../../components/Container';

storiesOf('module/SellerAddressForm', module).add('Summary', () => (
  <Container>
    <SellerAddressForm />
  </Container>
));
