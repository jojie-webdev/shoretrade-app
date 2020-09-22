import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  .items-row {
    margin-bottom: 24px;
  }
`;

export const InteractionCol = styled(Col)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const PendingItemContainer = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  margin-right: 16px;
  border-radius: 4px;
  min-width: 300px;
  ${({ onClick }) =>
    onClick
      ? `cursor: pointer;
  &:hover {
    opacity: 0.9;
  }`
      : ''};

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
