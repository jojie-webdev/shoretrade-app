import React from 'react';

import { storiesOf } from '@storybook/react';

import AlertInfo from '../../../src/components/base/AlertInfo';
import Container from '../../components/Container';

storiesOf('base/AlertInfo', module).add('Summary', () => (
  <Container style={{ width: 400 }}>
    <AlertInfo label="Shipping from more than 1 location? You can add multiple addresses once your account is approved." />
  </Container>
));
