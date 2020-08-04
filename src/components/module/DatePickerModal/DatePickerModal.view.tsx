import React from 'react';

import Modal from 'components/layout/Modal';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';

// import { useTheme } from 'utils/Theme';

import { DatePickerModalProps } from './DatePickerModal.props';
import { Container } from './DatePickerModal.style';

const START_DATE = moment();
const END_DATE = moment().add('day', 1);

const DatePickerModal = (props: DatePickerModalProps): JSX.Element => {
  // const theme = useTheme();

  const {
    startDate,
    endDate,
    onDateChange,
    focusedInput,
    onFocusChange,
    ...modalProps
  } = props;

  return (
    <Modal {...modalProps}>
      <Container>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={onDateChange}
          focusedInput={focusedInput}
          onFocusChange={onFocusChange}
          hideKeyboardShortcutsPanel
        />
      </Container>
    </Modal>
  );
};

export default DatePickerModal;
