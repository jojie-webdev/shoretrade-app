import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 4px;
  padding: 1px 4px;
`;

export const TypoWrapper = styled(Typography)`
  font-family: 'Graphik';
  letter-spacing: 1px;
  font-size: 12px;
`;
