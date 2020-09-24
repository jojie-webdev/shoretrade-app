import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.grey.noshade};
  padding: 16px;
  border-radius: 4px;
  ${({ theme }) =>
    theme.appType === 'buyer'
      ? `
      box-shadow: 0px 4px 4px 0px rgba(41, 43, 50, 0.12);
      `
      : null};
  min-height: 56px;
`;

export const CCStatus = styled.div`
  flex-direction: row;
  align-items: center;
`;