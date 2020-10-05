import React from 'react';

import { storiesOf } from '@storybook/react';

import Select from '../../../src/components/base/Select';
import Container from '../../components/Container';

storiesOf('base/Select', module).add('Normal', () => (
  <Container background="white">
    <Select options={['one', 'two', 'three']} label="Label" />
  </Container>
));

storiesOf('base/Select', module).add('Small and Dark', () => (
  <Container background="white">
    <Select options={['one', 'two', 'three']} label="Label" size="small" dark />
  </Container>
));
