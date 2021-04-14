import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 27px;
  min-height: 48px;
  flex: 1;
  background-color: ${({ theme }) => theme.grey.shade9};
`;

export const Title = styled.div`
  margin: auto;
`;
