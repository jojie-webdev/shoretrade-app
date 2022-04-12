import React from 'react';

import { storiesOf } from '@storybook/react';

import RadioButton from '../../../src/components/module/RadioButton';
import Container from '../../components/Container';

storiesOf('module/RadioButton', module).add('Summary', () => (
  <Container background="#111E2B">
    <div style={{ display: 'flex' }}>
      <RadioButton label="Barramundi" />
      <RadioButton label="Barramundi" selected />
    </div>
  </Container>
));
