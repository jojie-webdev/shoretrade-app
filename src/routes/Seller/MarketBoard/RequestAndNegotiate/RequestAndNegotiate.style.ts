import TypographyView from 'components/base/Typography/Typography.view';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 58px;
  }

  .contents {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export const SummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 320px;

  .submit-btns {
    display: flex;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;

    .text-field {
      margin-bottom: 1rem;
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
