import styled from 'utils/styled';

interface TouchableBaseProps {
  circle?: boolean;
  width?: number;
  height?: number;
  dark?: boolean;
}

export const TouchableBase = styled.button<TouchableBaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  padding: 8px;
  background-color: transparent;
  width: ${({ width }) => width};
  height: ${({ width, height, circle }) => (circle ? width : height)};
  border-radius: ${({ circle }) => (circle ? '50%' : '4px')};
  :hover {
    background-color: ${({ dark }) => (dark ? '#ffffff25' : '#00000010')};
  }
  :active {
    background-color: ${({ dark }) => (dark ? '#ffffff35' : '#00000018')};
  }
  :focus {
    outline: none;
  }
`;
