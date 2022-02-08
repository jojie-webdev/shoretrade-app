import styled from 'utils/styled';

export const Container = styled.div`
  border: 1px solid
    ${({ theme }) =>
      theme.appType === 'buyer' ? theme.grey.shade3 : theme.grey.shade8};
  border-radius: 4px;
  padding: 6px;
  display: flex;

  .text-container {
    margin-right: 12px;
  }
`;
