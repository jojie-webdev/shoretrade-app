import calendarDayEnd from 'res/images/calendar-day-end.svg';
import calendarStartDay from 'res/images/calendar-day-start.svg';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .calendar-title {
    width: 90%;
  }

  .button-container {
    margin-top: 32px;
    width: 90%;
  }

  /* Calendar Overrides */

  .CalendarDay__default,
  .DayPickerNavigation_button__default,
  .CalendarMonth,
  .CalendarMonthGrid,
  .DayPicker_transitionContainer,
  .DayPicker__withBorder {
    background: ${(props) => props.theme.grey.shade8};
    border: none;

    :hover {
      color: ${(props) => props.theme.grey.noshade};
    }
  }

  .DayPicker_transitionContainer {
    height: 369px !important;
  }

  .DayPickerNavigation_button__default {
    :hover {
      border: none;
    }
  }

  .DayPicker__withBorder {
    box-shadow: none;
  }

  .DayPicker_weekHeader {
    border-radius: 4px;
    background: ${(props) => props.theme.grey.shade9};
  }

  .DayPicker_weekHeader_li {
    padding: 6px 0;
  }

  .CalendarMonth_table {
    border-collapse: separate;
    border-spacing: 0 6px;
    margin-top: 8px;
  }

  .CalendarMonth_caption {
    color: ${(props) => props.theme.grey.noshade};
    font-size: ${pxToRem(14)};
    font-weight: 500;
  }

  .DayPicker_weekHeader_li,
  .CalendarDay {
    font-size: ${pxToRem(12)};
    font-weight: 500;
    color: ${(props) => props.theme.grey.shade7};
  }

  /* Will edit everything selected including everything between a range of dates */
  .CalendarDay__selected_span {
    background: ${(props) => props.theme.grey.shade9};
    color: ${(props) => props.theme.grey.shade7};
    border: none;

    :hover {
      color: ${(props) => props.theme.grey.shade7} !important;
    }
  }

  /*  Will edit when the second date (end date) in a range of dates
    is not yet selected. Edits the dates between your mouse and said date */
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span {
    background: ${(props) => props.theme.grey.shade9};
    color: ${(props) => props.theme.grey.shade7};
    border: none;

    :hover {
      color: ${(props) => props.theme.grey.shade7} !important;
    }
  }

  .CalendarDay__hovered_span {
    color: ${(props) => props.theme.grey.noshade} !important;
  }

  /*  Will edit selected date or the endpoints of a range of dates */
  .CalendarDay__selected {
    color: ${(props) => props.theme.grey.noshade};

    :hover {
      color: ${(props) => props.theme.grey.noshade};
      border: none;
    }
  }

  .CalendarDay__selected_start {
    background-size: 102% 100%;
    background-image: url(${() => calendarStartDay});
  }

  .CalendarDay__selected_end {
    background-position-x: -1px;
    background-size: 102% 100%;
    background-image: url(${() => calendarDayEnd});
  }

  .CalendarDay__lastDayOfWeek {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .CalendarDay__lastDayOfWeek {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .CalendarDay__firstDayOfWeek {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;
