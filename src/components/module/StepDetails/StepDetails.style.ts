import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const StepNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.noshade : theme.grey.shade9};
  ${({ theme }) =>
    theme.appType === 'buyer' ? `border: 1px solid ${theme.grey.shade3};` : ''}
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  width: 32px;
  height: 32px;
  border-radius: 12px;
`;

export const StepNumber = styled(Typography)``;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
`;

export const StepTitle = styled(Typography)`
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade1 : theme.grey.shade8};
`;

export const StepDescription = styled(Typography)`
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade5 : theme.grey.shade7};
`;
