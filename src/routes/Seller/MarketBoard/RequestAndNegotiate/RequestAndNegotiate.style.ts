import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .submit-btns {
    display: flex;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
    border-radius: 8px;
    max-width: 148px;
  }

  .button-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    bottom: 1%;
    padding: 16px;
    margin: -16px;
    background-color: ${({ theme }) => theme.grey.shade9};

    .submit-btn-1 {
      width: 50%;
      margin-right: 12px;
      margin-left: -4px;
    }
    .submit-btn-2 {
      width: 50%;
    }
  }

  .submit-btns-step1 {
    display: flex;
    @media ${BREAKPOINTS['sm']} {
      margin: 16px -24px -16px -24px;
      background-color: ${(props) => props.theme.grey.shade9};
    }
  }

  .submit-btn-step1 {
    margin-top: 1rem;
    margin-right: 8px;
    border-radius: 8px;
    max-width: 148px;

    @media ${BREAKPOINTS['sm']} {
      max-width: 100%;
      width: 100%;
      margin: 24px;
    }
  }

  .step-1-container {
    display: flex;
    flex-wrap: wrap;
  }

  .mobile-back-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;

    .product-name {
      margin-top: 2.5px;
      margin-left: 8px;
    }
  }
`;

export const SummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;

  @media (min-width: 1450px) {
    margin-left: 107px;
  }
  @media ${BREAKPOINTS['sm']} {
    min-width: 100%;
  }
  @media ${BREAKPOINTS['iPad']} {
    min-width: 100%;
  }
  @media ${BREAKPOINTS['xl']} {
    min-width: 100%;
  }
  .quantity-container {
    display: flex;

    .text-field {
      margin-bottom: 1rem;
      margin-right: 16px;
      > div {
        border-radius: 8px;
      }
    }
  }

  .shipping-to {
    display: flex;
    align-items: center;
    margin-top: 8px;

    p:first-child {
      margin-right: 4px;
    }
  }

  .offer-container {
    padding-top: 32px;
    margin: 16px 0;
    border-top: 1px solid ${({ theme }) => theme.grey.shade7};

    .computation-item-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      p {
        .indicator {
          font-weight: bold;
        }
      }
    }
    .border-bottom {
      margin-bottom: 16px;
    }
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .offers-state-badge {
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;

export const MetricContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 16px;
`;
export const StyledTouchable = styled(Touchable)``;
