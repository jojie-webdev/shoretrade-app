import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Radio from '../../../src/components/base/Radio';
import Container from '../../components/Container';

storiesOf('base/Radio', module).add('Summary', () => {
  const [checked, setChecked] = useState(false);

  return (
    <Container>
      <Radio checked={checked} onClick={() => setChecked(!checked)} />
    </Container>
  );
});
