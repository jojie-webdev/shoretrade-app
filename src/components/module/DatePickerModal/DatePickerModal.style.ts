import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .button-container {
    width: 100%;
    padding: 0 24px;
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
  }

  .DayPicker__withBorder {
    box-shadow: none;
  }

  .CalendarMonth_caption {
    color: ${(props) => props.theme.grey.noshade};
  }

  /* Will edit everything selected including everything between a range of dates */
  .CalendarDay__selected_span {
    background: ${(props) => props.theme.grey.shade9};
    color: ${(props) => props.theme.grey.shade7};
    border: none;
  }

  /*  Will edit when the second date (end date) in a range of dates
    is not yet selected. Edits the dates between your mouse and said date */
  .CalendarDay__hovered_span,
  .CalendarDay__hovered_span {
    background: ${(props) => props.theme.grey.shade9};
    color: ${(props) => props.theme.grey.shade7};
    border: none;

    :hover {
      color: ${(props) => props.theme.grey.shade7};
    }
  }

  .CalendarDay__hovered_span {
    color: ${(props) => props.theme.grey.noshade};
  }

  /*  Will edit selected date or the endpoints of a range of dates */
  .CalendarDay__selected {
    background: ${(props) => props.theme.brand.primary};
    border: ${(props) => props.theme.brand.primary};
    border-radius: 100px;
    color: ${(props) => props.theme.grey.noshade};

    :hover {
      color: ${(props) => props.theme.grey.noshade};
      border: none;
    }
  }
`;
