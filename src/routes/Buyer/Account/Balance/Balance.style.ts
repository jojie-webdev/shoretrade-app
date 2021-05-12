import Interactions from 'components/base/Interactions';
import InteractionCreditCard from 'components/module/InteractionCreditCard';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .balance-header {
    margin-bottom: 8px;
  }

  .balance-btn {
    margin: 24px 0;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 8px;
      margin-bottom: 48px;
    }
  }
`;

export const CreditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: ${({ theme }) => theme.grey.noshade};
  border: 2px solid ${({ theme }) => theme.grey.shade3};
  border-radius: 8px;
  margin-bottom: 12px;

  @media ${BREAKPOINTS['sm']} {
    border: none;
    padding: 0;
    background: transparent;
  }
`;

export const LinkCreditHistory = styled(Interactions)`
  margin-bottom: 18px;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 12px;
  }
`;

export const LinkCreditCard = styled(InteractionCreditCard)`
  max-height: 74px;
  margin-bottom: 12px;
`;

export const Notification = styled.div`
  display: flex;
  border-radius: 4px;
  border: transparent;
  margin: 12px auto;
  & > div {
    flex: 1;
  }
`;
