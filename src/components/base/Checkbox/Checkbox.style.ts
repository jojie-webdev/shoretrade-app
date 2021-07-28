import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }

  @media (hover: none) and (pointer: coarse) {
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 0.5;
    }
  }

  cursor: pointer;
`;

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
`;

export const InnerCheck = styled.span<{
  scale: number;
}>`
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-radius: 2px;
  border-width: 0 2px 2px 0;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%) rotate(45deg)
    ${({ scale }) => `scale(${scale}, ${scale})`};
`;

export const CustomCheckbox = styled.span<{
  size: number;
  checked: boolean;
  disabled?: boolean;
  borderColor?: string;
  customCheckBox?: any;
}>`
  border-radius: 4px;
  position: relative;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border: ${({ checked, disabled, theme, borderColor }) => {
    if (checked) return `1px solid transparent`;
    if (disabled) return `1px solid rgba(0, 0, 0, 0.26)`;
    return `1px solid ${borderColor || theme.brand.primary}`;
  }};
  background-color: ${({ checked, disabled, theme }) => {
    if (checked) return theme.brand.primary;
    if (disabled) return `rgba(0, 0, 0, 0.26)`;
    return 'transparent';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled(Typography)`
  margin-left: 8px;
  color: ${({ disabled, theme }) => {
    if (disabled) return theme.grey.shade7;
    const isSeller = theme.appType !== 'buyer';
    return isSeller ? '#ffffff' : theme.grey.shade9;
  }};
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
