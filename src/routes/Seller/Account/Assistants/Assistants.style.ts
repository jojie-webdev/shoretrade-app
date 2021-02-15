import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .btn-add-assistant {
    margin-top: 32px;
  }
`;

export const AccountName = styled(Typography)`
  margin-top: 4px;
`;

export const StyledInteraction = styled(Interactions)`
  margin-bottom: 12px;
  padding: 16px 24px;
`;
