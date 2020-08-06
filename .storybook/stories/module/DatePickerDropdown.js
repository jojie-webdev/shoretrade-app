import React from 'react';

import { storiesOf } from '@storybook/react';

import DatePickerDropdown from '../../../src/components/module/DatePickerDropdown';
import Container from '../../components/Container';

storiesOf('module/DatePickerDropdown', module).add('Summary', () => (
  <Container>
    <DatePickerDropdown />
  </Container>
));
