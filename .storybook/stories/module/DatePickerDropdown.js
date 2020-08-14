import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import moment from 'moment';

import DatePickerDropdown from '../../../src/components/module/DatePickerDropdown';
import Container from '../../components/Container';

storiesOf('module/DatePickerDropdown', module).add('Summary', () => {
  const [date, setDate] = useState(null);

  function onDateChange(date: moment.Moment) {
    setDate(date);
  }

  return (
    <Container background="white">
      <div style={{ width: '280px' }}>
        <DatePickerDropdown
          date={date}
          onDateChange={onDateChange}
          placeholder="Custom placeholder"
          label="Label"
        />
      </div>
    </Container>
  );
});
