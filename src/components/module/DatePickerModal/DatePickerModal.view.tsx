import React from 'react';

import Button from 'components/base/Button';
import Modal from 'components/layout/Modal';
import { DayPickerRangeController } from 'react-dates';

// import { useTheme } from 'utils/Theme';

import { DatePickerModalProps } from './DatePickerModal.props';
import { Container } from './DatePickerModal.style';

const DatePickerModal = (props: DatePickerModalProps): JSX.Element => {
  // const theme = useTheme();

  const {
    startDate,
    endDate,
    onDateChange,
    focusedInput,
    onFocusChange,
    onClickApply,
    ...modalProps
  } = props;

  return (
    <Modal {...modalProps}>
      <Container>
        <DayPickerRangeController
          horizontalMonthPadding={0}
          verticalHeight={350}
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
