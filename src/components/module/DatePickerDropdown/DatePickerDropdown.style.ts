import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  padding: 16px 8px;
  border-radius: 4px;
  margin: 0;

  .DayPicker {
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  }

  .CalendarDay__default {
    border: none;
    margin: 0;
  }

  .CalendarDay__outside {
    color: ${(props) => props.theme.grey.shade5};
  }
`;

export const NavButton = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 23px;
  line-height: 0.78;
  border-radius: 3px;
  padding: 6px 9px;

  right: ${(props) => (props.direction === 'right' ? '15px' : '')};
  left: ${(props) => (props.direction === 'left' ? '15px' : '')};
`;
