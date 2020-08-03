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

export const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
`;

export const InnerCircle = styled.span<{
  size: number;
}>`
  border-radius: 50%;
  position: absolute;
  height: ${({ size }) => `${size * 0.2}px`};
  width: ${({ size }) => `${size * 0.2}px`};
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const CustomRadio = styled.span<{
  size: number;
  checked: boolean;
}>`
  border-radius: 50%;
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
