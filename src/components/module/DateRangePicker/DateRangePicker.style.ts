import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 16px 8px; */
  border-radius: 4px;
  margin: 0;
  // width: 100%;

  .content {
    margin-top: 8px;
    position: relative;
    width: 100%;
  }

  .DayPicker {
    position: absolute;
    /* 48 is the height of the dropdown */
    top: calc(48px + 12px);
    left: 0;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 8px;
    z-index: 999;
  }

  .CalendarDay__selected {
    background: #ffffff;
  }

  .CalendarDay__selected_span {
    background: #ffffff;
  }

  .CalendarDay__selected_span .calendar-day-content {
    background: ${(props) => props.theme.brand.primary};
    color: #ffffff;
  }

  .CalendarDay__selected .calendar-day-content {
    background: ${(props) => props.theme.brand.primary};
    color: #ffffff;
  }

  .calendar-day-content {
    margin-top: 10px;
    margin-left: 4px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .CalendarDay__default {
    border: none;
    margin: 0;
    color: ${({ theme }) => theme.grey.shade7};
    font-size: 12px;

    &:hover {
      background: #ffffff;
    }

    &:hover .calendar-day-content {
      background: ${(props) => props.theme.brand.primary};
      color: #ffffff;
    }
  }

  .DayPicker_weekHeader_ul > .DayPicker_weekHeader_li > small {
    font-size: 0.75rem;
    font-weight: bold;
    line-height: 16px;
    color: ${({ theme }) => theme.grey.shade7};
    top: 52px;
  }

  .CalendarMonth_caption {
    padding-top: 16px;
  }

  .CalendarDay__outside {
    color: ${(props) => props.theme.grey.shade5};
  }
`;

export const Dropdown = styled.div<{ disabled?: boolean }>`
  background: ${({ theme, disabled }) =>
    disabled ? theme.grey.shade3 : theme.grey.noshade};
  padding: 12px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.grey.shade6};

  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-content {
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
    }
    svg > path {
      fill: ${({ theme }) => theme.grey.shade6};
    }
  }

  svg:focus {
    transform: rotate(180deg);
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.states.hover};
  }
`;

export const NavButton = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 16px;
  line-height: 0.78;
  border-radius: 3px;
  padding: 6px 9px;

  right: ${(props) => (props.direction === 'right' ? '15px' : '')};
  left: ${(props) => (props.direction === 'left' ? '15px' : '')};
`;

export const ChevronDownFlipped = styled.div<{ pressed?: boolean }>`
  transform: ${(props) => props.pressed && 'rotate(180deg)'};
`;

export const DateTypography = styled(Typography)`
  display: flex;
  align-items: center;
`;

export const AllTextTypography = styled(Typography)`
  margin-left: 0.2rem;
`;

export const StyledButton = styled(Button)`
  position: relative;
  z-index: 2;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  top: 300px;
`;
