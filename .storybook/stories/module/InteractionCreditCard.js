import React from 'react';

import { storiesOf } from '@storybook/react';

import InteractionCreditCard from '../../../src/components/module/InteractionCreditCard';
import Container from '../../components/Container';

storiesOf('module/InteractionCreditCard', module).add('Summary', () => (
  <Container appType="buyer">
    <InteractionCreditCard isDefault={true} lastFour="1234" brand="Visa" />
    <br />
    <InteractionCreditCard isDefault={false} lastFour="1235" brand="Mastercard" />
    <br />
    <InteractionCreditCard isDefault={true} lastFour="1235" brand="Paypal" />
    <br />
    <InteractionCreditCard isDefault={false} lastFour="1235" brand="Zippay" />
  </Container>
));
