import React from 'react';

import { storiesOf } from '@storybook/react';

import DeclineSellerModal from '../../../src/components/module/DeclineSellerModal';
import Container from '../../components/Container';

storiesOf('module/DeclineSellerModal', module).add('Summary', () => (
  <Container>
    <DeclineSellerModal />
  </Container>
));
