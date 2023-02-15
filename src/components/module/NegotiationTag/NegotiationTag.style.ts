import styled from 'utils/styled';

export const Container = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  padding: 1px 4px;
`;
