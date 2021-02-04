import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;

  .divider {
    margin: 0 16px;
  }

  a > p:hover {
    color: ${({ theme }) => theme.brand.primary};
  }
`;
