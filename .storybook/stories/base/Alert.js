import React from 'react';

import { storiesOf } from '@storybook/react';

import Alert from '../../../src/components/base/Alert';
import Container from '../../components/Container';

const MOCK_TEXT = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
unde illo, nulla aliquam tempore nisi deleniti sequi tenetur!`;

storiesOf('base/Alert', module).add('Summary', () => (
  <Container>
    <Alert
      content={MOCK_TEXT}
      variant="default"
      buttonText="Default"
      style={{ marginBottom: '8px' }}
    />
    <Alert
      content={MOCK_TEXT}
      variant="alert"
      buttonText="Alert"
      style={{ marginBottom: '8px' }}
    />
    <Alert
      content={MOCK_TEXT}
      variant="warning"
      buttonText="Warning"
      style={{ marginBottom: '8px' }}
    />
    <Alert
      content={MOCK_TEXT}
      variant="error"
      buttonText="Error"
      style={{ marginBottom: '8px' }}
    />
    <Alert
      content={MOCK_TEXT}
      variant="success"
      buttonText="Success"
      style={{ marginBottom: '8px' }}
    />
  </Container>
));
