import React from 'react';

import { storiesOf } from '@storybook/react';

import MultiSelect from '../../../src/components/base/MultiSelect';
import Container from '../../components/Container';

storiesOf('base/MultiSelect', module).add('Summary', () => (
  <Container appType="buyer">
    <MultiSelect
      options={[
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ]}
    />
  </Container>
));
