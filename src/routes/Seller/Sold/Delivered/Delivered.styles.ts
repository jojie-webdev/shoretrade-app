import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const DeliveredRow = styled(Row)`
  .delivered-col {
    margin-bottom: 16px;

    .section-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      .title {
        margin-left: 4px;
      }
    }

    .order-price {
      display: flex;
      justify-content: flex-start;
      & > p {
        display: inline-block;
        vertical-align: sub;
      }
      & > svg {
        margin-left: 16px;
      }
    }
  }
`;
