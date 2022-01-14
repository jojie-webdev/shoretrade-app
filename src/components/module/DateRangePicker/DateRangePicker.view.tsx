import React, { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  Minus,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import 'react-dates/initialize';
import moment from 'moment';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import { useTheme } from 'utils/Theme';

import { DateRangePickerProps } from './DateRangePicker.props';
import {
  Dropdown,
  NavButton,
  ChevronDownFlipped,
  Container,
  DateTypography,
  AllTextTypography,
  StyledButton,
} from './DateRangePicker.style';

const DateRangePicker = (props: DateRangePickerProps): JSX.Element => {
  const {
    onDatesChange,
    label,
    format,
    disabled,
    labelVariant,
    endDate,
    startDate,
    onClear,
    background,
    border,
    isOpen,
  } = props;

  const theme = useTheme();
  const [show, setShow] = useState<boolean>(isOpen || false);
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape>(
    'startDate'
  );
  const onFocusChange = (f: any) => {
    setFocusedInput(!f ? 'startDate' : f);
  };

  const downArrowIcon = () => {
    const Dropdown = () => <ChevronDown fill={theme.grey.shade7} />;

    return (
      <ChevronDownFlipped pressed={show}>
        <Dropdown />
      </ChevronDownFlipped>
    );
  };

  const handleMonthLabel = ({ month }: any) => {
    return (
      <Typography
        color="shade7"
        variant="label"
        weight="bold"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {moment(month).format('MMM YYYY')}
      </Typography>
    );
  };

  const handleWeekDays = (day: any) => {
    day._locale._weekdaysMin = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ];

    return <div className="calendar-day-content">{day.format('D')}</div>;
  };

  const clearId = 'date-range-clear-btn';

  return (
    <Container>
      <Typography variant={labelVariant || 'overline'} color="shade6">
        {label}
      </Typography>

      <div className="content">
        <Dropdown
          onClick={() => {
            setShow(!show);
          }}
          disabled={disabled}
          style={disabled ? { pointerEvents: 'none' } : {}}
          border={border}
          background={background}
        >
          <div className="left-content">
            {startDate && !endDate && (
              <DateTypography variant="label" color="shade9" weight="400">
                <Calendar
                  width={16.67}
                  height={16.67}
                  fill={theme.grey.shade7}
                />
                {startDate.format(format)}
              </DateTypography>
            )}
            {startDate && endDate && (
              <DateTypography variant="label" color="shade9" weight="400">
                <Calendar width={16.67} height={16.67} />
                {startDate.format(format)}&nbsp; <Minus />
                {endDate.format(format)}
              </DateTypography>
            )}
            {!startDate && !endDate && (
              <DateTypography variant="label" color="shade9" weight="400">
                <Calendar width={16.67} height={16.67} />
                <AllTextTypography variant="label" color="shade9" weight="400">
                  All
                </AllTextTypography>
              </DateTypography>
            )}
          </div>
          {downArrowIcon()}
        </Dropdown>
        {show && (
          <div>
            <DayPickerRangeController
              onDatesChange={onDatesChange}
              onFocusChange={onFocusChange}
              focusedInput={focusedInput}
              startDate={startDate}
              endDate={endDate}
              hideKeyboardShortcutsPanel
              renderDayContents={handleWeekDays}
              renderMonthElement={handleMonthLabel}
              horizontalMonthPadding={0}
              numberOfMonths={1}
              noBorder
              enableOutsideDays
              daySize={37}
              // disabled={disabled}
              navNext={
                <NavButton direction="right">
                  <ArrowRight fill={theme.grey.shade7} height={12} width={12} />
                </NavButton>
              }
              navPrev={
                <NavButton direction="left">
                  <ArrowLeft fill={theme.grey.shade7} height={12} width={12} />
                </NavButton>
              }
              onOutsideClick={(e: any) => {
                if (
                  e.target?.id === clearId ||
                  e.composedPath().indexOf(document.getElementById(clearId)) >=
                    0
                ) {
                  onClear();
                }
                setShow(false);
              }}
            />
            {(startDate !== null || endDate !== null) && (
              <StyledButton
                id={clearId}
                variant="primary"
                text="Clear"
                size="sm"
                onClick={() => {
                  onClear();
                }}
              />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default DateRangePicker;
