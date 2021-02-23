import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiateModal from '../../../src/components/module/NegotiateModal';
import Container from '../../components/Container';

storiesOf('module/NegotiateModal', module).add('Summary', () => (
  <Container>
    <NegotiateModal isOpen />
  </Container>
));
