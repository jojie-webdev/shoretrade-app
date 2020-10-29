import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const SmallAlertContainer = styled.div`
  // padding: 8px;
  padding: 16px 0px 16px 18px;
  width: 100%;
  background: ${({ theme }) => theme.grey.shade2};
  border-radius: 4px;
  margin-bottom: 24px;
  flex-direction: column;

  display: flex;
  .text-people {
    margin-top: 12px;
  }

  .text {
    margin-top: 4px;
    margin-left: 5.67px;
  }

  .icon-container {
    margin-right: 8px;
  }
`;

export const TextContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;

export const AccountName = styled(Typography)`
  margin: 4px 0;
`;

export const Label = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade8};
`;

export const StyledInteaction = styled(Interactions)`
  margin-bottom: 8px;
`;
