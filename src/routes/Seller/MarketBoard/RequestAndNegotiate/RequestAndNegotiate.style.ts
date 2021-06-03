import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography/Typography.view';
import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) =>
      props.isIOS ? `calc(${IOSBOTTOMPADDING} + 140px)` : '140px'};
  }

  .breadcrumb-container {
    margin-bottom: 40px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 4px;
    }
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

  .step-1-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (min-width: 1560px) {
      justify-content: flex-start;
    }
  }

  .mobile-header {
    display: flex;
    margin-bottom: 16px;
  }

  .spacer {
    @media (min-width: 1440px) {
      margin-right: 20px;
    }

    @media (min-width: 1560px) {
      margin-right: 107px;
    }
  }
`;

export const SummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;

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

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 15px;
  }

  .offers-state-badge {
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 0.2rem;
    }
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
