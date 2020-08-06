import Dropdown from 'react-dropdown';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const PREFIX = 'dropdownSelect';

const font = `
    font-size: ${pxToRem(14)};
    line-height: 24px;
    font-weight: 500;`;

export const StyledDropdown = styled(Dropdown)`
  .${PREFIX}Container {
    height: 48px;
    background: #ffffff;
    color: ${({ theme }) => theme.grey.shade9};
    border: 1px solid ${({ theme }) => theme.grey.shade5};
    border-radius: 4px;
    padding: 12px 16px;
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

  .Dropdown-disabled {
    //
  }
`;

export const ArrowContainer = styled.div<{ flipped?: boolean }>`
  position: absolute;
  right: 20px;
  top: 11px;
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '')});
`;
