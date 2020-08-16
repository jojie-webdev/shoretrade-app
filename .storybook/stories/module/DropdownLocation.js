import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import DropdownLocation from '../../../src/components/module/DropdownLocation';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const DropdownComponent = ({ children }) => {
  const [value, setValue] = useState('');

  const onSelect = (v) => {
    setValue(v.address);
  };

  return <DropdownLocation value={value} onSelect={onSelect} label="Label" />;
};

storiesOf('module/DropdownLocation', module).add('Summary', () => (
  <Container background="white">
    <DropdownComponent />
  </Container>
));
