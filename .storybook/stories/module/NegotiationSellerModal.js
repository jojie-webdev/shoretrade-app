import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiationSellerModal from '../../../src/components/module/NegotiationSellerModal';
import Container from '../../components/Container';

storiesOf('module/NegotiationSellerModal', module).add('Summary', () => (
  <Container>
    <NegotiationSellerModal />
  </Container>
));
