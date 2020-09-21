import Typography from 'components/base/Typography/Typography.view';
import Dropdown from 'react-dropdown';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const PREFIX = 'dropdownSelect';

export const Container = styled.div<{ label?: string }>`
  width: 100%;
  position: relative;
`;

const font = `
    font-size: ${pxToRem(14)};
    line-height: 24px;
    font-weight: 500;`;

export const StyledDropdown = styled(Dropdown)`
  .${PREFIX}Container {
    height: 48px;
    background: ${({ theme, disabled }) =>
      disabled ? theme.grey.shade3 : '#ffffff'};
    color: ${({ theme, disabled }) =>
      disabled ? theme.grey.shade6 : theme.grey.shade9};
    border: 1px solid ${({ theme }) => theme.grey.shade5};
    border-radius: 4px;
    padding: 12px 16px;
    margin-top: 4px;
  }

  .${PREFIX}Placeholder {
    ${font};
  }

  .${PREFIX}Menu {
    border: 1px solid ${({ theme }) => theme.grey.shade5};
    border-radius: 4px;
    padding: 0 16px;
    margin-top: 8px;
  }

  .Dropdown-option {
    ${font};
    color: ${({ theme }) => theme.grey.shade9};
    padding: 12px 0;
    &:hover {
      background-color: transparent;
    }
  }
`;

export const ArrowContainer = styled.div<{ flipped?: boolean }>`
  position: absolute;
  right: 20px;
  top: 11px;
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '')});
`;

export const Label = styled(Typography)``;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
