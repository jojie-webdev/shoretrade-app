import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.brand.alert};
  border-radius: 8px;
`;

export const Text = styled(Typography)`
  display: flex;
  flex: 1;
  margin-left: 5px;
`;
