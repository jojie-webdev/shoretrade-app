import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';

import { DatePickerModalProps } from './DatePickerModal.props';
import { Container } from './DatePickerModal.style';

const DatePickerModal = ({
  startDate,
  endDate,
  onDateChange,
  focusedInput,
  onFocusChange,
  onClickApply,
  ...modalProps
}: DatePickerModalProps): JSX.Element => {
  return (
    <Modal {...modalProps}>
      <Container>
        <Typography className="calendar-title" variant="title5" color="noshade">
          Calendar
        </Typography>

        <DayPickerRangeController
          horizontalMonthPadding={0}
          verticalHeight={500}
          startDate={startDate}
          endDate={endDate}
          onDatesChange={onDateChange}
          focusedInput={focusedInput}
          onFocusChange={onFocusChange}
          daySize={50}
          hideKeyboardShortcutsPanel
        />

        <div className="button-container">
          <Button text="Apply" takeFullWidth onClick={onClickApply} />
        </div>
      </Container>
    </Modal>
  );
};

export default DatePickerModal;
