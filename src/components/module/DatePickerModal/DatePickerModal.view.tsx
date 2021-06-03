import React from 'react';

import Button from 'components/base/Button';
import { Close } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import { useMediaQuery } from 'react-responsive';
import theme from 'utils/Theme';

import { DatePickerModalProps } from './DatePickerModal.props';
import {
  Container,
  CalendarContainer,
  ExitButton,
  LeftFilterContent,
  TopMobileHeaderContainer,
} from './DatePickerModal.style';

const DatePickerModal = ({
  startDate,
  endDate,
  onDateChange,
  focusedInput,
  onFocusChange,
  onClickApply,
  children,
  onReset,
  onClickCloseMobile,
  ...modalProps
}: DatePickerModalProps): JSX.Element => {
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return isSmallScreen ? (
    <MobileModal {...modalProps} backgroundColor={theme.grey.shade9}>
      <TopMobileHeaderContainer>
        <Typography className="calendar-title" variant="title5" color="noshade">
          Dates
        </Typography>

        <LeftFilterContent>
          <ExitButton
            onClick={(e) => {
              onClickCloseMobile && onClickCloseMobile();
              e.preventDefault();
            }}
          >
            <Close />
          </ExitButton>
        </LeftFilterContent>
      </TopMobileHeaderContainer>
      {children && isSmallScreen && <div className="filters"> {children}</div>}
      <Container>
        <CalendarContainer>
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
        </CalendarContainer>

        <div className="button-container">
          <Button text="Apply" takeFullWidth onClick={onClickApply} />
        </div>
      </Container>
    </MobileModal>
  ) : (
    <Modal {...modalProps}>
      <Container>
        <Typography className="calendar-title" variant="title5" color="noshade">
          Calendar
        </Typography>
        <CalendarContainer>
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
        </CalendarContainer>

        <div className="button-container">
          <Button text="Apply" takeFullWidth onClick={onClickApply} />
        </div>
      </Container>
    </Modal>
  );
};

export default DatePickerModal;
