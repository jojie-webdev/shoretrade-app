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
} from './DateRangePicker.style';

const DateRangePicker = (props: DateRangePickerProps): JSX.Element => {
  const {
    onDatesChange,
    label,
    placeholder = '',
    format,
    disabled,
    labelVariant,
    endDate,
    startDate,
  } = props;

  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
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
        >
          <div className="left-content">
            {startDate && !endDate && (
              <DateTypography variant="caption" color="shade7">
                <Calendar width={16.67} height={16.67} />
                {startDate.format(format)}
              </DateTypography>
            )}
            {startDate && endDate && (
              <DateTypography variant="caption" color="shade7">
                <Calendar width={16.67} height={16.67} />
                {startDate.format(format)}&nbsp; <Minus />
                {endDate.format(format)}
              </DateTypography>
            )}
            {!startDate && !endDate && (
              <Typography variant="label" color="shade5">
                {placeholder}
              </Typography>
            )}
          </div>
          {downArrowIcon()}
        </Dropdown>

        {show && (
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
            onOutsideClick={() => setShow(false)}
          />
        )}
      </div>
    </Container>
  );
};

export default DateRangePicker;
