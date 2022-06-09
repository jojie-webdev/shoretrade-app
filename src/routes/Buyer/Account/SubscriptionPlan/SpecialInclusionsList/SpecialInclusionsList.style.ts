import styled from 'utils/styled';

export const Container = styled.div<{
  isSeller: boolean;
}>`
  margin-top: 8px;
  display: grid;
  grid-gap: 8px;
`;
