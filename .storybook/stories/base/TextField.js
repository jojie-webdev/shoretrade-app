import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import TextField from '../../../src/components/base/TextField';
import Container from '../../components/Container';

storiesOf('base/TextField', module).add('Summary', () => {
  const [text, setText] = useState('');
  return (
    <Container>
      <TextField label="Label" value={text} onChangeText={setText} />
    </Container>
  );
});
