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
  background-color: ${({ theme }) => theme.grey.shade9};
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const StepNumber = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade1};
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 16px;
`;

export const StepTitle = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade1};
`;

export const StepDescription = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade5};
`;
