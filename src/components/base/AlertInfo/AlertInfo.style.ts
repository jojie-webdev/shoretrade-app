import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div<{ dark?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
  background-color: ${({ dark, theme }) =>
    dark ? theme.brand.alert : 'rgba(255, 207, 92, 0.12)'};
`;

export const Text = styled(Typography)`
  display: flex;
  flex: 1;
  margin-left: 5px;
`;
