import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import * as moment from 'moment';
import { FocusedInputShape } from 'react-dates';

import DatePickerModal from '../../../src/components/module/DatePickerModal';
import Container from '../../components/Container';

const modalProps = {
  isOpen: true,
};

const START_DATE = moment();
const END_DATE = moment().add('day', 7);

storiesOf('module/DatePickerModal', module).add('Summary', () => {
  const [startDate, setStartDate] = useState(START_DATE);
  const [endDate, setEndDate] = useState(END_DATE);
  const [focus, setFocus] = useState('startDate');

  function onDateChange(newDates: {
    startDate: moment.Moment,
    endDate: moment.Moment,
  }) {
    setStartDate(newDates.startDate);
    setEndDate(newDates.endDate);
  }

  function onFocusChange(arg: FocusedInputShape) {
    setFocus(!arg ? 'startDate' : arg);
  }

  return (
    <Container>
      <DatePickerModal
        onDateChange={onDateChange}
        startDate={startDate}
        endDate={endDate}
        onFocusChange={onFocusChange}
        focusedInput={focus}
        {...modalProps}
      />
    </Container>
  );
});
