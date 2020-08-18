import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import PhoneTextField from '../../../src/components/module/PhoneTextField';
import Container from '../../components/Container';

storiesOf('module/PhoneTextField', module).add('Summary', () => {
  const [value, setValue] = useState('');

  return (
    <Container background="white">
      <PhoneTextField label="Phone" value={value} onChangeText={setValue} />
    </Container>
  );
});
