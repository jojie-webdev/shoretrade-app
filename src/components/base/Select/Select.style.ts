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

export const StyledDropdown = styled(Dropdown)<{
  dark?: boolean;
  grey?: boolean;
  disabled?: boolean;
}>`
  .${PREFIX}Container {
    height: 48px;
    background: ${({ theme, disabled, dark, grey }) =>
      disabled || grey
        ? theme.grey.shade3
        : dark
        ? theme.grey.shade9
        : '#ffffff'};
    color: ${({ theme, disabled, dark }) =>
      disabled
        ? theme.grey.shade6
        : dark
        ? theme.grey.noshade
        : theme.grey.shade9};
    border: ${({ theme, dark }) =>
      `1px solid ` + dark ? theme.grey.shade9 : theme.grey.shade5};
    border-radius: 4px;
    padding: 12px 16px;
    // margin-top: 4px;
  }

  /* TODO: Should extend .${PREFIX}Container */
  .${PREFIX}ContainerThin {
    height: 30px;
    background: ${({ theme, disabled, dark, grey }) =>
      disabled || grey
        ? theme.grey.shade3
        : dark
        ? theme.grey.shade9
        : '#ffffff'};
    color: ${({ theme, disabled, dark }) =>
      disabled
        ? theme.grey.shade6
        : dark
        ? theme.grey.noshade
        : theme.grey.shade9};
    border: ${({ theme, dark }) =>
      `1px solid ` + dark ? theme.grey.shade9 : theme.grey.shade5};
    border-radius: 4px;
    padding: 4px 16px;
    // margin-top: 4px;
  }

  .${PREFIX}Placeholder {
    ${font};
    margin-right: 8px;
  }

  .${PREFIX}Menu {
    border: 1px solid ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    border-radius: 4px;
    box-shadow: 0px 2px 8px rgba(41, 43, 50, 0.10);
    // padding: 0 16px;
    margin-top: 8px;
    background-color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    
  }

  .Dropdown-option {
    ${font};
    background-color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9};
    padding: 12px 16px;
    &:hover {
      background-color: ${({ theme }) =>
        theme.appType === 'seller' ? '#ffffff20' : '#00000020'};
    }
  }

  .Dropdown-control {
    border: 1px solid ${({ theme }) => theme.grey.shade9};
    border-radius:12px;
  }

  .Dropdown-option.is-selected {
    color: ${({ theme }) => theme.grey.noshade};
    background-color: ${({ theme }) => theme.brand.primary};
  }
`;

export const ArrowContainer = styled.div<{ size?: string; flipped?: boolean }>`
  position: absolute;
  right: ${({ size }) => (size === 'small' ? '9px' : '20px')};
  top: ${({ size }) => (size === 'small' ? '4px' : '11px')};
  transform: rotate(${({ flipped }) => (flipped ? '180deg' : '')});
  color: ${({ theme }) => theme.brand.primary};
`;

export const Label = styled(Typography)`
  margin-bottom: 4px;
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
