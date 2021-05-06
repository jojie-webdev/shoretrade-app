import styled from 'utils/styled';

export const Container = styled.div`
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0;
  padding: 24px;
  background: ${({ theme }) => theme.grey.shade1};
`;
