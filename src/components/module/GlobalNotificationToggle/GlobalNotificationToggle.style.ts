import styled from 'utils/styled';

export const Container = styled.div`
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  width: 320px;
  height: 72px;
  display: flex;
  justify-content: space-between;
  padding: 18px;
  align-items: center;
  border-radius: 12px;
`;

export const LeftComponentContainer = styled.div`
  flex: 1 0 auto;
`;

export const IconContainer = styled.div`
  display: flex;
  margin-right: 14px;
`;
