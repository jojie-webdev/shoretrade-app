import React from 'react';

import { storiesOf } from '@storybook/react';

import AcceptSellerModal from '../../../src/components/module/AcceptSellerModal';
import Container from '../../components/Container';

storiesOf('module/AcceptSellerModal', module).add('Summary', () => (
  <Container>
    <AcceptSellerModal />
  </Container>
));
