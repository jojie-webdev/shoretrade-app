import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .btn-add-account {
    margin-top: 32px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${({ theme }) => theme.grey.noshade};
  border: ${({ theme }) => `2px solid ${theme.grey.shade3}`};
  border-radius: 8px;
  margin-bottom: 24px;

  .text-people {
    margin-top: 8px;
  }

  svg {
    margin-top: 4px;
    margin-right: 8px;
    min-width: 17px;
    min-height: 17px;
    width: 17px;
    height: 17px;
    margin-bottom: 4px;
  }

  .button-col {
    margin-top: 20px;
  }

  @media ${BREAKPOINTS['sm']} {
    border: none;
    padding: 0;
    background: transparent;
  }
`;

export const TextContainer = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  margin-top: 8px;

  @media ${BREAKPOINTS['sm']} {
    align-items: flex-start;
  }
`;

export const AccountName = styled(Typography)`
  margin-top: 4px;
`;

export const StyledInteraction = styled(Interactions)`
  margin-bottom: 12px;
  padding: 16px 24px;
`;
