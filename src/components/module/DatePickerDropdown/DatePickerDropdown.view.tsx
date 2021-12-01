import React, { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  DropdownArrow,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { DayPickerSingleDateController } from 'react-dates';
import { useTheme } from 'utils/Theme';

import { DatePickerDropdownProps } from './DatePickerDropdown.props';
import {
  Container,
  NavButton,
  Dropdown,
  Error,
  IconContainer,
  ContentAndArrowContainer,
  FlippedArrowContainer,
  DropdownContainer,
} from './DatePickerDropdown.style';

const DatePickerDropdown = (props: DatePickerDropdownProps): JSX.Element => {
  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
  const {
    date,
    onDateChange,
    label,
    placeholder = '',
    error,
    isOutsideRange,
    showCalendarIcon,
    showArrowDownIcon,
    height,
    borderRadius,
    topComponent,
  } = props;

  const renderDropdownContent = () => (
    <DayPickerSingleDateController
      date={date}
      onDateChange={(date) => {
        onDateChange(date);
        setShow(false);
      }}
      focused={true}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onFocusChange={() => {}}
      horizontalMonthPadding={0}
      numberOfMonths={1}
      daySize={37}
      hideKeyboardShortcutsPanel
      enableOutsideDays
      isOutsideRange={isOutsideRange}
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
  );

  return (
    <Container className={props.className}>
      <Typography variant="overline" color="shade6" weight="900">
        {label}
      </Typography>

      <div className="content">
        <Dropdown
          onClick={() => setShow(!show)}
          active={show}
          error={(error || '').length > 0}
          height={height}
          borderRadius={borderRadius}
        >
          <IconContainer>
            {showCalendarIcon && (
              <div style={{ paddingLeft: 3 }}>
                <Calendar fill={theme.grey.shade6} />{' '}
              </div>
            )}
          </IconContainer>
          <ContentAndArrowContainer>
            {date ? (
              <div style={{ display: 'flex' }}>
                <Typography variant="label">
                  {date.format('DD.MM.yyyy')}
                </Typography>
              </div>
            ) : (
              <Typography variant="label" color="shade5">
                {placeholder}
              </Typography>
            )}
            {showArrowDownIcon ? (
              show ? (
                <FlippedArrowContainer>
                  <DropdownArrow />
                </FlippedArrowContainer>
              ) : (
                <DropdownArrow />
              )
            ) : null}
          </ContentAndArrowContainer>
        </Dropdown>

        {show &&
          (topComponent ? (
            <DropdownContainer>
              {topComponent}
              {renderDropdownContent()}
            </DropdownContainer>
          ) : (
            renderDropdownContent()
          ))}
      </div>
      {(error || '').length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </Container>
  );
};

export default React.memo(DatePickerDropdown);
