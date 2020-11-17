import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Checkbox from '../../../src/components/base/Checkbox';
import Container from '../../components/Container';

storiesOf('base/Checkbox', module).add('Summary', () => {
  const [checked, setChecked] = useState(false);

  return (
    <Container background="white">
      <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
    </Container>
  );
});
