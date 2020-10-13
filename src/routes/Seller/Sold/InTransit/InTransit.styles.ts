import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const TransitRow = styled(Row)`
  .transit-col {
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
