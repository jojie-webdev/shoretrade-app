import React from 'react';

import { storiesOf } from '@storybook/react';

import PaymentTimeLeft from '../../../src/components/module/PaymentTimeLeft';
import Container from '../../components/Container';

storiesOf('module/PaymentTimeLeft', module).add('Summary', () => (
  <Container>
    <PaymentTimeLeft />
  </Container>
));
