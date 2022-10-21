import Typography from 'components/base/Typography';
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

  .CalendarMonth_caption {
    color: ${({ theme }) => (theme.isSFM ? theme.grey.shade7 : 'inherit')};
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

  .DayPicker_weekHeader {
    color: ${({ theme }) => (theme.isSFM ? theme.grey.shade7 : 'inherit')};
    font-weight: 700;
  }

  .CalendarDay__default {
    border: none;
    margin: 0;
    border-radius: 4px;
    color: ${({ theme }) => (theme.isSFM ? theme.grey.shade7 : 'inherit')};

    :hover {
      border-radius: 100px;
      color: ${(props) => props.theme.brand.primary};
    }
  }

  .CalendarDay__outside {
    color: ${(props) => props.theme.grey.shade5};
  }

  .CalendarDay__blocked_out_of_range {
    color: ${(props) => props.theme.grey.shade5};
  }

  .CalendarDay__selected {
    background: ${(props) => props.theme.brand.primary};
    border-radius: 100px;
  }
  .CalendarDay__today {
    color: ${(props) => props.theme.brand.primary};
    border-radius: 100px;
    background-color: #e4e7e7;
  }
`;

export const Dropdown = styled.div<{
  active: boolean;
  error?: boolean;
  height?: string;
  borderRadius?: string;
}>`
  background: ${(props) => props.theme.grey.noshade};
  padding: 0px 12px;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  height: ${({ height }) => height || '48px'};
  width: 100%;
  border: 1px solid
    ${({ theme, active, error }) =>
      error
        ? theme.brand.error
        : active
        ? theme.brand.primary
        : theme.grey.shade3};
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.grey.shade6};

  svg {
    margin-right: 16px;
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

export const Error = styled(Typography)`
  margin-top: 4px;
`;

export const ContentAndArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0px 8px 0px 15px;
`;

export const FlippedArrowContainer = styled.div`
  transform: rotate(180deg);
`;

export const DropdownContainer = styled.div<{
  disabled?: boolean;
}>`
  position: absolute;
  top: calc(48px + 12px);
  right: 0;
  box-shadow: 0px 6px 12px rgb(41 43 50 / 12%);
  border-radius: 4px;
  z-index: 999;
  background: #fff;
  text-align: center;

  .DayPicker {
    position: unset;
    top: unset;
    right: unset;
    box-shadow: unset;
    border-radius: unset;
    z-index: unset;
  }
`;
