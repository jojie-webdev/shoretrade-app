import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div``;

export const AlertsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;

  > div {
    margin-bottom: 16px;
  }
`;

export const AlertContentContainer = styled.div`
  .actions {
    margin-top: 14px;
  }
`;

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

  .section {
    background: ${({ theme }) => theme.grey.noshade};
    border-radius: 12px;
    padding: 24px;
    width: 100%;
  }

  @media ${BREAKPOINTS.sm} {
    .payment-section {
      margin: 24px 10px;
    }
  }

  @media ${BREAKPOINTS.md} {
    .payment-section {
      margin: 24px 10px;
    }
  }

  @media ${BREAKPOINTS.lg} {
    .payment-section {
      margin: 24px 8px;
    }
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

export const BadgesContainer = styled.div`
  display: flex;

  > div {
    flex: 0 1 auto;
  }
`;

export const BillingSection = styled.div`
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

export const FlexContainer = styled.div`
  display: flex;
`;

export const PlanTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlanContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 12px;

  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const PlanSection = styled.div`
  display: flex;
  gap: 24px;
`;

export const Subscription = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e8f5;
  border-radius: 12px;
  padding: 24px;
  width: 50%;

  .subscription-action {
    &:hover {
      cursor: pointer;
    }
  }

  .disable-downgrade {
    pointer-events: none;
    opacity: 0.4;
  }
`;

export const AdditionalSubSection = styled.div`
  .cancel-subscription {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap 8px;
`;

export const PlanPriceContainer = styled.div`
  margin: 8px;
`;

export const PlanPrice = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const IncusionSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  padding-bottom: 24px;
  margin-top: 8px;

  .subscription-action {
    margin-top: 24px;
    &:hover {
      cursor: pointer;
    }
`;

export const ReverseMarketplace = styled.div`
  display: flex;
  padding-bottom: 24px;
`;

export const SpecialInclusionsContainer = styled.div`
  margin-top: 8px;
  position: relative;
`;

export const TooltipWrapper = styled.span`
  .tooltip-container {
    margin: 4px;
  }
`;

export const FooterNote = styled.div`
  margin-bottom: 16px;
`;

export const CurrentPlanIndicator = styled.div`
  border: 1px solid ${({ theme }) => theme.brand.primary};
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 12px;
`;

export const PlusIconWrapper = styled.div`
  width: 14px;
  height: 14px;
  margin-right: 4px;
`;

export const PlanTitleWrapper = styled.div`
  display: fex;
  justify-content: space-between;
`;
