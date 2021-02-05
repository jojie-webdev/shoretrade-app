import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;

  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${({ theme }) => theme.grey.noshade};
  border: ${({ theme }) => `2px solid ${theme.grey.shade3}`};
  border-radius: 4px;
  margin-bottom: 24px;

  .text-people {
    margin-top: 8px;
  }

  .text {
    margin-top: 4px;
    margin-left: 4px;
  }
`;

export const TextContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const AccountName = styled(Typography)`
  margin: 4px 0;
`;

export const StyledInteraction = styled(Interactions)`
  margin-bottom: 8px;
`;
