import TouchableView from 'components/base/Touchable';
import Typography from 'components/base/Typography';
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
      flex-direction: column;
      /* align-items: center; */
      padding-right: 16px;

      .row {
        display: flex;
        flex-direction: row;
      }

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

export const ValuesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Value = styled.div`
  margin-right: 56px;
  padding: 0 4px 0 4px;
  min-width: 120px;
`;

export const OrderNumber = styled(Typography)`
  color: ${({ theme }) => theme.brand.primary};
  font-weight: bold;
`;

export const Preview = styled.img`
  width: 72px;
  height: 72px;
  margin-right: 12px;
  border-radius: 4px;
`;

export const Details = styled.div``;

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const Tag = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  background: ${({ theme }) => theme.grey.shade8};
  align-items: center;
  min-height: 16px;
  border-radius: 2px;
  margin-right: 4px;
`;

export const TagText = styled(Typography)``;

export const Size = styled(Typography)`
  color: ${({ theme }) => theme.grey.noshade};
  font-weight: bold;
  margin-left: 4px;
`;

export const StyledTouchable = styled(TouchableView)`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const CustomBadge = styled.div`
  padding: 4px 8px 4px;
  border-radius: 4px;
  background: ${(props) => props.theme.grey.shade3};
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin-top: 4px;
    margin-right: 8px;
  }
`;
