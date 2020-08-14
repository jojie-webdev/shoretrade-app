import React, { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  DropdownArrow,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { DayPickerSingleDateController } from 'react-dates';

// import { useTheme } from 'utils/Theme';
import { DatePickerDropdownProps } from './DatePickerDropdown.props';
import { Container, NavButton, Dropdown } from './DatePickerDropdown.style';

const DatePickerDropdown = (props: DatePickerDropdownProps): JSX.Element => {
  // const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
  const { date, onDateChange, label, placeholder = '' } = props;

  return (
    <Container>
      <Typography variant="overline" color="shade6" weight="900">
        {label}
      </Typography>

      <div className="content">
        <Dropdown onClick={() => setShow(!show)} active={show}>
          <div className="left-content">
            <Calendar></Calendar>
            {date ? (
              <Typography variant="label">{date.format('M.D.yyyy')}</Typography>
            ) : (
              <Typography variant="label" color="shade5">
                {placeholder}
              </Typography>
            )}
          </div>
          <DropdownArrow />
        </Dropdown>

        {show && (
          <DayPickerSingleDateController
            date={date}
            onDateChange={(date) => {
              onDateChange(date);
              setShow(false);
            }}
            focused={true}
            onFocusChange={() => {}}
            horizontalMonthPadding={0}
            numberOfMonths={1}
            daySize={37}
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
        )}
      </div>
    </Container>
  );
};

export default React.memo(DatePickerDropdown);
