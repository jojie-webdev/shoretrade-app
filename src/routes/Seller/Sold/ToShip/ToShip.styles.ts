import Interaction from 'components/base/Interactions';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const PendingRow = styled.div`
  margin-bottom: 32px;

  .title-col {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .svg-container {
      margin-right: 8px;
    }
  }

  .pagination-container {
    display: flex;
    justify-content: center;
  }
`;

export const PendingItemContainer = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  margin-right: 16px;
  border-radius: 4px;
  min-width: 300px;

  .top-content {
    padding: 12px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      /* align-items: center; */
      padding-right: 16px;

      img {
        height: 64px;
        width: 64px;
        border: 1px solid red;
        border-radius: 4px;
      }

      .text-container {
        display: flex;
        flex-direction: column;
        margin-left: 8px;

        .shipping {
          display: flex;
          align-items: center;

          .shipping-text {
            margin-right: 4px;
          }
        }
      }
    }

    .right {
    }
  }

  .divider {
    background: ${(props) => props.theme.grey.shade7};
    height: 2px;
    margin: 0;
  }

  .bottom {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text-container {
      display: flex;
      align-items: center;

      .text {
        margin-left: 8px;
      }
    }
  }
`;

export const PriorityNumber = styled.div`
  background: ${(props) => props.theme.brand.primary};
  border-radius: 2px;
  width: 34px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 12px;

  .content {
    display: flex;
    align-items: center;

    .center-text {
      margin: 0 4px;
    }
  }
`;

export const DeliveryRow = styled(Row)`
  margin-bottom: 32px;

  .title {
    margin-bottom: 8px;
  }
`;
