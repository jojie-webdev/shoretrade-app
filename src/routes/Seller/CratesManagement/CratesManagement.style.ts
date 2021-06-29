import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div``;

export const Leased = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 8px;
`;

export const Count = styled(Typography)`
  margin-top: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;
