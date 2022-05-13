import styled from 'utils/styled';

export const Container = styled.div<{
  isSeller: boolean;
}>`
  margin-bottom: 15px;
  display: grid;
  grid-row-gap: 24px;

  .icon-holder {
    display: grid;
    padding: 9px;
    border-radius: 12px;
    background: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
    border: 1px solid
      ${({ theme }) =>
        theme.appType === 'seller' ? theme.grey.shade10 : theme.grey.shade3};
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  }
`;

export const AdditionalSubscription = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxContainer = styled.div`
  padding: 4px;
`;
