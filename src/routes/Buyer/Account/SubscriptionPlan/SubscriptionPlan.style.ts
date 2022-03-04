import styled from 'utils/styled';

export const Container = styled.div``;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: 40px;
`;

export const DicountContainer = styled.div`
  display: flex;
  margin: auto;
  position: relative;
  height: 18px;
  width: 260px;

  .discount {
    position: absolute;
    right: 0;

    p {
      font-family: Wilderness;
      font-size: 24px;
    }
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
`;

export const SubscriptionContainer = styled.div`
  display: flex;
  justify-content: center;

  .section {
    background: ${({ theme }) => theme.grey.noshade};
    border-radius: 12px;
    padding: 24px;
  }
`;

export const PaymentMethodSection = styled.div`
  margin-bottom: 20px;

  .card-info {
    display: flex;
    margin-bottom: 24px;
    margin-top: 4px;

    .card-icon {
      padding: 0 8px;
      border-radius: 8px;
      box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
      margin-right: 4px;
    }
  }

  .see-payment-methods {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const BillingSection = styled.div`
  margin-bottom: 20px;

  .billing-date {
    display: flex;
    margin-bottom: 24px;
    margin-top: 8px;
    align-items: center;
  }
`;

export const PlanSection = styled.div`
  .plan-rate {
    display: flex;
    margin: 24px 0;
  }

  .cancel-subscription {
    &:hover {
      cursor: pointer;
    }
  }
`;
