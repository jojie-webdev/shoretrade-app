import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainText = styled(Typography)`
  margin-bottom: 32px;
`;

export const Circle = styled.div`
  height: 220px;
  width: 220px;
  border-radius: 110px;
  background: ${(props) => props.theme.grey.shade9};
  margin-bottom: 16px;
`;
