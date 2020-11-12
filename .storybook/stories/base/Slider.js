import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Slider from '../../../src/components/base/Slider';
import Container from '../../components/Container';

const Single = () => {
  const [value, setValue] = useState(2);
  return (
    <Slider
      value={value}
      onChange={(v) => {
        if (typeof v === 'number') {
          setValue(v);
        }
      }}
      max={4}
    />
  );
};

storiesOf('base/Slider', module).add('Single', () => (
  <Container appType="buyer">
    <Single />
  </Container>
));

const Range = () => {
  const [value, setValue] = useState([0, 400]);
  return (
    <Slider
      value={value}
      onChange={(v) => {
        if (typeof v === 'object') {
          setValue(v);
        }
      }}
      max={400}
    />
  );
};

const MaskedRange = () => {
  const [value, setValue] = useState([0, 2]);
  return (
    <Slider
      value={value}
      onChange={(v) => {
        if (typeof v === 'object') {
          setValue(v);
        }
      }}
      max={4}
      maskValue={(v) => {
        return ['Extra Small', 'Small', 'Medium', 'Large', 'Extra Large'][v];
      }}
    />
  );
};

storiesOf('base/Slider', module).add('Range', () => (
  <Container appType="buyer">
    <Range />
    <MaskedRange />
  </Container>
));
