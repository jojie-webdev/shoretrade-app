import styled from 'utils/styled';

export const TouchableBase = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  color: white;
  padding: 8px;
  background-color: transparent;
  :hover {
    background-color: #00000010;
  }
  :active {
    background-color: #00000018;
  }
  :focus {
    outline: none;
  }
`;
