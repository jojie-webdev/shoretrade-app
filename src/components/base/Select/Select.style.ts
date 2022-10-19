import Typography from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import Dropdown from 'react-dropdown';
import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

import { DropdownProps } from './Select.props';

export const PREFIX = 'dropdownSelect';

export const Container = styled.div<{ label?: string; marginTop?: string }>`
  width: 100%;
  position: relative;
  margin-top: ${({ marginTop }) => marginTop || 0};
`;

const font = `
    font-size: ${pxToRem(14)};
    line-height: 24px;
    font-weight: 500;`;

export const StyledDropdown = styled(Dropdown)<DropdownProps>`
  margin-top: ${({ marginTop, labelMarginTop }) =>
    labelMarginTop || marginTop ? marginTop : '8px'} !important;
  .${PREFIX}Container {
    height: ${({ height }) => (height ? height : '48px')};
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
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : '4px'};
    padding: ${({ padding }) => (padding ? padding : '12px 16px')};
    display: flex;
    align-items: center;
  }

  /* TODO: Should extend .${PREFIX}Container */
  .${PREFIX}ContainerThin {
    height: 30px;
    background: ${({ theme, disabled, dark, grey, background }) =>
      background
        ? background
        : disabled || grey
        ? theme.grey.shade3
        : dark
        ? theme.grey.shade9
        : '#ffffff'};
    color: ${({ theme, disabled, dark }) => {
      if (disabled) {
        return `${theme.grey.shade6};`;
      }
      if (dark) {
        return `${theme.grey.noshade};`;
      }
      if (theme.isSFM) {
        return `${SpecialColors.blue};`;
      }
      return `${theme.grey.shade9};`;
    }}
    border: ${({ theme, dark }) =>
      `1px solid ` + dark ? theme.grey.shade9 : theme.grey.shade5};
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : '4px'};
    padding: 4px 16px;
    // margin-top: 4px;
  }

  .${PREFIX}Placeholder {
    ${font};
    line-height: 14px;
    color: ${({ theme, dark }) => {
      if (theme.isSFM) {
        return `${theme.grey.shade6};`;
      }
      if (dark) {
        return `${theme.grey.noshade};`;
      }
      return `${theme.grey.shade9};`;
    }}
    margin-right: 10px;
  }

  .${PREFIX}Menu {
    border: 1px solid ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : '4px'};
    box-shadow: 0px 2px 8px rgba(41, 43, 50, 0.10);
    // padding: 0 16px;
    margin-top: 8px;
    background-color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    display: ${({ hiddenMenu }) => (hiddenMenu ? 'none' : 'block')};
  }

  .Dropdown-option {
    ${font};
    background-color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    color: ${({ theme }) =>
      theme.appType === 'seller'
        ? theme.grey.noshade
        : theme.isSFM
        ? SpecialColors.blue
        : theme.grey.shade9};
    padding: 12px 16px;
    &:hover {
      background-color: ${({ theme }) =>
        theme.appType === 'seller' ? '#283139' : '#00000020'};
    }
  }

  .Dropdown-control {
    border:  ${({ theme, unbordered }) =>
      unbordered ? '0' : `1px solid ${theme.grey.shade9}`};
    border-radius: ${({ borderRadius }) =>
      borderRadius ? borderRadius : '12px'};
    border: ${({ border }) => border};
  }

  .Dropdown-option.is-selected {
    color: ${({ theme }) => theme.grey.noshade};
    background-color: ${({ theme }) => theme.brand.primary};
  }

  .Dropdown-placeholder{
    @media ${BREAKPOINTS['sm']} {
      color: ${({ theme, dark }) => {
        if (theme.isSFM) {
          return `${theme.grey.shade6};`;
        }
        return dark ? `${theme.grey.noshade};` : `${theme.grey.shade9};`;
      }}
    }
    @media ${BREAKPOINTS['xs']} {
      height: 18px;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
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
  display: flex;
  align-items: center;
  gap: 4px;

  .tooltip-container {
    margin: 0;
    height: 12px;
    .__react_component_tooltip p {
      display: inline-block;
      text-transform: lowercase;
    }
    .__react_component_tooltip p:first-letter {
      text-transform: uppercase;
    }

    svg {
      height: 16px;
    }
  }
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
