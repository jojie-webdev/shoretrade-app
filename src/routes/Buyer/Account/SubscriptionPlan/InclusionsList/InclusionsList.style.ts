import styled from 'utils/styled';

export const Container = styled.div<{
  isSeller: boolean;
}>`
  margin: 24px 0;
  display: flex;
  flex-direction: column;

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

export const BenefitsList = styled.ul`
  padding-left: 1em;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const BenefitsItem = styled.li`
  border: 1px solid ${({ theme }) => theme.grey.shade3};
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  padding: 8px;
`;
