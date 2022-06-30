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
    background: ${({ theme }) => theme.grey.shade9};
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
      box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      margin-right: 4px;
      background: #fff;
    }
  }

  .see-payment-methods {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const BillingSection = styled.div` {
  margin-bottom: 20px;
  .billing-item {
    margin-bottom: 24px;
  }

  .billing-date {
    display: flex;
    margin-bottom: 8px;
    margin-top: 8px;

    svg {
      align-self: center;
    }
  }

  .section-footer {
    margin-top: 18px;
  }
`;

export const PlanSection = styled.div`
  .plan-rate {
    display: flex;
    margin: 24px 0;
  }

  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const PlanTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const AdditionalSubSection = styled.div`
  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;

  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const IncusionSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 24px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 12px;
  padding: 24px;
`;

export const ReverseMarketplace = styled.div`
  display: flex;
  padding-bottom: 24px;

  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PlanPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const BadgesContainer = styled.div`
  display: flex;

  > div {
    flex: 0 1 auto;
  }
`;
