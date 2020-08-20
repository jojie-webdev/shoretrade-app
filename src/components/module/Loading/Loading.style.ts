import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

export const Label = styled(Typography)`
  margin-top: 20px;
`;
