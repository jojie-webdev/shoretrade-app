import React from 'react';

import { storiesOf } from '@storybook/react';

import MessageModal from '../../../src/components/module/MessageModal';
import Container from '../../components/Container';

storiesOf('module/MessageModal', module).add('Seller', () => (
  <Container appType="seller">
    <MessageModal
      isOpen
      recipient="Buyer Company"
      onSend={(message) => console.log('SEND MESSAGE:', message)}
    />
  </Container>
));
