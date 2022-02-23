import React from 'react';

import { storiesOf } from '@storybook/react';

import MultiSelect from '../../../src/components/base/MultiSelect';
import Container from '../../components/Container';

storiesOf('base/MultiSelect', module).add('Summary', () => (
  <Container appType="buyer">
    <MultiSelect
      options={[
        { name: 'Option 1', id: 1 },
        { name: 'Option 2', id: 2 },
      ]}
      displayValue="name"
    />
  </Container>
));
