import React from 'react';

import { ArrowLeft, ArrowRight } from 'components/base/SVG';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';

// import { useTheme } from 'utils/Theme';
import { DatePickerDropdownProps } from './DatePickerDropdown.props';
import { Container, NavButton } from './DatePickerDropdown.style';

const DatePickerDropdown = (props: DatePickerDropdownProps): JSX.Element => {
  // const theme = useTheme();
  const {
    startDate,
    endDate,
    onDateChange,
    focusedInput,
    onFocusChange,
  } = props;

  return (
    <Container>
      <DayPickerSingleDateController
        date={moment()}
        focused={false}
        onDateChange={(date) => {}}
        onFocusChange={(args) => {}}
        horizontalMonthPadding={0}
        numberOfMonths={1}
        daySize={35}
        hideKeyboardShortcutsPanel
        enableOutsideDays
        noBorder
        navNext={
          <NavButton direction="right">
            <ArrowRight />
          </NavButton>
        }
        navPrev={
          <NavButton direction="left">
            <ArrowLeft />
          </NavButton>
        }
      />
    </Container>
  );
};

export default React.memo(DatePickerDropdown);
