import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiationCreditsModal from '../../../src/components/module/NegotiationCreditsModal';
import Container from '../../components/Container';

storiesOf('module/NegotiationCreditsModal', module).add('Summary', () => (
  <Container>
    <NegotiationCreditsModal />
  </Container>
));
