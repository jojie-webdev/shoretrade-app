import React from 'react';

import { storiesOf } from '@storybook/react';

import BuyerNegotiationAlert from '../../../src/components/module/BuyerNegotiationAlert';
import Container from '../../components/Container';

storiesOf('module/BuyerNegotiationAlert', module).add('Summary', () => (
  <Container>
    <BuyerNegotiationAlert />
  </Container>
));
