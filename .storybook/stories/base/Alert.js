import React from 'react';

import { storiesOf } from '@storybook/react';

import Alert from '../../../src/components/base/Alert';
import Container from '../../components/Container';

const MOCK_TEXT = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
unde illo, nulla aliquam tempore nisi deleniti sequi tenetur!`;

const props = {
  content: MOCK_TEXT,
  style: { marginBottom: '8px' },
};

storiesOf('base/Alert', module).add('Seller', () => (
  <Container appType="seller">
    <Alert {...props} variant="info" />
    <Alert {...props} variant="alert" />
    <Alert {...props} variant="warning" />
    <Alert {...props} variant="error" />
    <Alert {...props} variant="success" />

    <Alert {...props} variant="info" header="Header" alignText="center" />
  </Container>
));

storiesOf('base/Alert', module).add('Buyer', () => (
  <Container appType="buyer">
    <Alert {...props} variant="info" />
    <Alert {...props} variant="alert" />
    <Alert {...props} variant="warning" />
    <Alert {...props} variant="error" />
    <Alert {...props} variant="success" />

    <Alert {...props} variant="info" header="Header" alignText="center" />
  </Container>
));
