import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div``;

export const Leased = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 8px;
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
        border: 1px solid ${theme.brand.secondary};
      `;
    }
  }}
`;

export const Count = styled(Typography)`
  margin-top: 4px;
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
        color: ${theme.brand.secondary};
      `;
    }
  }}
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;
