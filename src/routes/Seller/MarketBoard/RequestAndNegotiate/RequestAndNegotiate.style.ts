import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import TypographyView from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 140px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .submit-btns1 {
    display: flex;
  }

  .submit-btns {
    display: flex;
    justify-content: space-between;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
    max-width: 148px;
  }

  .modal_container__exit_btn {
    background-color: ${({ theme }) => theme.grey.shade10} !important;
    border: ${({ theme }) => theme.grey.shade8} !important;

    svg > path {
      fill: ${({ theme }) => theme.grey.noshade};
    }
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  .badge {
    padding: 6px 8px;
    border-radius: 8px;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 0.2rem;
    }
  }
`;

export const StyledBadge = styled(Badge)`
  padding: 6px 8px;
  border-radius: 8px;
  margin-bottom: 0.6rem;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 0.2rem;
  }
`;

export const SummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 641px;
  padding: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.grey.shade9};

  .quantity-container {
    display: flex;

    .dash {
      margin-left: 0.6rem;
      margin-right: 0.6rem;
    }
  }

  .shipping-to {
    display: flex;
    align-items: center;
    margin-top: 16px;

    p:first-child {
      margin-right: 4px;
    }
  }

  .offer-container {
    padding-top: 24px;
    margin: 16px 0;
    border-top: 1px solid ${({ theme }) => theme.grey.shade7};

    .computation-item-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 6px;

      p {
        .indicator {
          font-weight: bold;
        }
      }
    }
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
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

export const Contents = styled.div`
  margin-top: 24px;
  padding: 48px;
  background-color: ${({ theme }) => theme.grey.shade10};
  border-radius: 12px;
`;

export const Tag = styled.div`
  padding: 4px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.grey.noshade};
  width: fit-content;
  margin-right: 5px;
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade6};
`;

export const CalculationContainer = styled.div`
  margin-top: 24px;
`;

export const LeftBtnsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 630px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
  }
`;

export const NegoCTAContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  @media (max-width: 630px) {
    flex-wrap: wrap;
  }
`;

export const DeclineBtnWrapper = styled(Button)`
  margin-right: 8px;

  @media (max-width: 630px) {
    width: inherit;
  }

  @media (max-width: 480px) {
    margin-right: 0px;
  }
`;

export const NegoBtnWrapper = styled(Button)`
  @media (max-width: 630px) {
    width: inherit;
  }

  @media (max-width: 480px) {
    margin-top: 5px;
  }
`;

export const AcceptBtnWrapper = styled(Button)`
  margin-left: 8px;

  @media (max-width: 630px) {
    margin-top: 5px;
    margin-left: 0px;
    width: 100%;
  }
`;
