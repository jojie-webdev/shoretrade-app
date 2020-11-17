import React from 'react';

import { storiesOf } from '@storybook/react';

import BuyerAddressForm from '../../../src/components/module/BuyerAddressForm';
import Container from '../../components/Container';

storiesOf('module/BuyerAddressForm', module).add('Summary', () => (
  <Container>
    <BuyerAddressForm />
  </Container>
));
