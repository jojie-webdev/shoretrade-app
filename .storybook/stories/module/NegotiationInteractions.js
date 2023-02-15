import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiationInteractions from '../../../src/components/module/NegotiationInteractions';
import Container from '../../components/Container';

storiesOf('module/NegotiationInteractions', module).add('Summary', () => (
  <Container>
    <NegotiationInteractions />
  </Container>
));
