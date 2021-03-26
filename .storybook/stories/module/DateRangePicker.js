import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import DateRangePicker from '../../../src/components/module/DateRangePicker';
import Container from '../../components/Container';

storiesOf('module/DateRangePicker', module).add('Summary', () => {
  const now = moment();
  const monday = now.clone().weekday(1);
  const friday = now.clone().weekday(5);

  const [startDate, setStartDate] = useState(monday);
  const [endDate, setEndDate] = useState(friday);

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <Container>
      <div style={{ width: 280 }}>
        <DateRangePicker
          label="From"
          onDatesChange={onDatesChange}
          startDate={startDate}
          endDate={endDate}
          format="D MMM YYYY"
        />
      </div>
    </Container>
  );
});
