import styled from 'utils/styled';

export const Container = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

export const TabButton = styled.button`
  border: 0;
  border-bottom: 1px solid
    ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade3};
  background: transparent;
  padding: 10px 16px 10px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.grey.shade9};
  margin-bottom: 16px;

  &.active {
    border-color: ${({ theme }) => theme.brand.primary};
    color: ${({ theme }) => theme.grey.shade10};
  }
`;
