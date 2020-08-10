import React from 'react';

import { storiesOf } from '@storybook/react';

import Alert from '../../../src/components/base/Alert';
import Container from '../../components/Container';

const MOCK_TEXT = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
unde illo, nulla aliquam tempore nisi deleniti sequi tenetur!`;

const props = {
  content: MOCK_TEXT,
  onClick: () => console.log('Alert Action'),
  style: { marginBottom: '8px' },
};

storiesOf('base/Alert', module).add('Seller', () => (
  <Container appType="seller">
    <Alert {...props} variant="default" buttonText="Default" />
    <Alert {...props} variant="alert" buttonText="Alert" />
    <Alert {...props} variant="warning" buttonText="Warning" />
    <Alert {...props} variant="error" buttonText="Error" />
    <Alert {...props} variant="success" buttonText="Success" />
  </Container>
));

storiesOf('base/Alert', module).add('Buyer', () => (
  <Container appType="buyer">
    <Alert {...props} variant="default" buttonText="Default" />
    <Alert {...props} variant="alert" buttonText="Alert" />
    <Alert {...props} variant="warning" buttonText="Warning" />
    <Alert {...props} variant="error" buttonText="Error" />
    <Alert {...props} variant="success" buttonText="Success" />
  </Container>
));
