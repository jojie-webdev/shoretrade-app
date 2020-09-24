import React from 'react';

import { storiesOf } from '@storybook/react';

import CreditCard from '../../../src/components/base/CreditCard';
import Container from '../../components/Container';

storiesOf('base/CreditCard', module).add('Summary', () => (
  <Container appType="buyer">
    <CreditCard lastFour="1235" brand="Visa" />
    <br />
    <CreditCard lastFour="1235" brand="Mastercard" />
    <br />
    <CreditCard lastFour="1235" brand="Paypal" />
    <br />
    <CreditCard lastFour="1235" brand="Zippay" />
  </Container>
));
