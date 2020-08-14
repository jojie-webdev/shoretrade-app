import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 16px 8px; */
  border-radius: 4px;
  margin: 0;
  width: 100%;

  .content {
    margin-top: 4px;
    position: relative;
    width: 100%;
  }

  .DayPicker {
    position: absolute;
    /* 48 is the height of the dropdown */
    top: calc(48px + 12px);
    right: 0;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    z-index: 999;
  }

  .CalendarDay__default {
    border: none;
    margin: 0;
    border-radius: 4px;

    :hover {
      border-radius: 100px;
    }
  }

  .CalendarDay__outside {
    color: ${(props) => props.theme.grey.shade5};
  }

  .CalendarDay__selected {
    background: ${(props) => props.theme.brand.primary};
    border-radius: 100px;
  }
`;

export const Dropdown = styled.div<{ active: boolean }>`
  background: ${(props) => props.theme.grey.noshade};
  padding: 12px;
  border-radius: 4px;
  height: 48px;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.brand.primary : props.theme.grey.shade3};

  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-content {
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }
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
