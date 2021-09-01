import React from 'react';

import { storiesOf } from '@storybook/react';

import CreditCard from '../../../src/components/module/CreditCard';
import Container from '../../components/Container';

storiesOf('module/CreditCard', module).add('Summary', () => (
  <Container>
    <CreditCard />
  </Container>
));
