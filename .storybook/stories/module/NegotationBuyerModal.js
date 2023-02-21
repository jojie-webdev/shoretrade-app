import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiationBuyerModal from '../../../src/components/module/NegotiationBuyerModal';
import Container from '../../components/Container';

storiesOf('module/NegotiationBuyerModal', module).add('Summary', () => (
  <Container>
    <NegotiationBuyerModal />
  </Container>
));
