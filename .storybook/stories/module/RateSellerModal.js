import React from 'react';

import { storiesOf } from '@storybook/react';

import RateSellerModal from '../../../src/components/module/RateSellerModal';
import Container from '../../components/Container';

storiesOf('module/RateSellerModal', module).add('Summary', () => (
  <Container>
    <RateSellerModal />
  </Container>
));
