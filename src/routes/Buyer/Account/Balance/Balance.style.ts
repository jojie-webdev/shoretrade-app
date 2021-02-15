import Interactions from 'components/base/Interactions';
import InteractionCreditCard from 'components/module/InteractionCreditCard';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .balance-header {
    margin-bottom: 8px;
  }

  .balance-btn {
    margin: 24px 0;
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
`;

export const LinkCreditHistory = styled(Interactions)`
  margin-bottom: 18px;
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
