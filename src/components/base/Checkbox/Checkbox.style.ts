import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
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
  border-width: 0px 2px 2px 0px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%) rotate(45deg)
    ${({ scale }) => `scale(${scale}, ${scale})`};
`;

export const Checkbox = styled.span<{
  size: number;
  checked: boolean;
  disabled?: boolean;
}>`
  border-radius: 4px;
  position: relative;
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border: ${({ checked, theme }) => {
    if (checked) return `1px solid transparent`;

    return `1px solid ${theme.brand.primary}`;
  }};
  background-color: ${({ checked, theme }) => {
    if (checked) return theme.brand.primary;

    return 'transparent';
  }};
`;

export const Label = styled(Typography)`
  margin-left: 8px;
  color: ${({ theme }) => {
    const isSeller = theme.appType !== 'buyer';
    return isSeller ? '#ffffff' : theme.grey.shade9;
  }};
`;
