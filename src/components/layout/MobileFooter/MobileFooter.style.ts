import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade1};
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
`;
