import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const SmallAlertContainer = styled.div`
  padding: 8px;
  width: 100%;
  background: rgba(255, 207, 92, 0.12);
  border-radius: 4px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;

  .icon-container {
    margin-right: 8px;
  }

  .text {
    margin-top: 6px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;

export const AccountName = styled(Typography)`
  margin: 4px 0;
`;

export const StyledInteaction = styled(Interactions)`
  margin-bottom: 8px;
`;
