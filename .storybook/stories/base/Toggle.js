import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Toggle from '../../../src/components/base/Toggle';
import Container from '../../components/Container';

const Base = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <p>{checked ? 'on' : 'off'}</p>
      <Toggle onClick={() => setChecked(!checked)} checked={checked} />
    </>
  );
};

storiesOf('base/Toggle', module).add('Summary', () => (
  <Container>
    <Base />
  </Container>
));
