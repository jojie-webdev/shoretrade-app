import Badge from 'components/base/Badge';
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

  .submit-btns {
    display: flex;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
    max-width: 148px;
  }
`;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;

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
