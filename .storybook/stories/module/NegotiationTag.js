import React from 'react';

import { storiesOf } from '@storybook/react';

import NegotiationTag from '../../../src/components/module/NegotiationTag';
import Container from '../../components/Container';

storiesOf('module/NegotiationTag', module).add('Summary', () => (
  <Container>
    <NegotiationTag />
  </Container>
));
