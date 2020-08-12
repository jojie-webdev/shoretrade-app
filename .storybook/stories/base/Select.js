import React from 'react';

import { storiesOf } from '@storybook/react';

import Select from '../../../src/components/base/Select';
import Container from '../../components/Container';

storiesOf('base/Select', module).add('Summary', () => (
  <Container background="white">
    <Select options={['one', 'two', 'three']} label="Label" />
  </Container>
));
