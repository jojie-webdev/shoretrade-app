import React from 'react';

import { storiesOf } from '@storybook/react';

import CreditCardRow from '../../../src/components/module/CreditCardRow';
import Container from '../../components/Container';

storiesOf('module/CreditCardRow', module).add('Buyer', () => (
  <Container appType="buyer">
    <CreditCardRow brand="visa" active={true} lastFour="1235" />
    <br />
    <CreditCardRow brand="mastercard" active={false} lastFour="1235" />
    <br />
    <CreditCardRow brand="zippay" active={true} lastFour="1235" />
    <br />
    <CreditCardRow brand="paypal" active={false} lastFour="1235" />
  </Container>
));

storiesOf('module/CreditCardRow', module).add('Seller', () => (
  <Container appType="seller">
    <CreditCardRow brand="visa" active={true} lastFour="1235" />
    <br />
    <CreditCardRow brand="mastercard" active={false} lastFour="1235" />
    <br />
    <CreditCardRow brand="zippay" active={true} lastFour="1235" />
    <br />
    <CreditCardRow brand="paypal" active={false} lastFour="1235" />
  </Container>
));