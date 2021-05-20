import InteractionsView from 'components/base/Interactions';
import TouchableView from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { ItemDetailVariants } from './OrderItem.props';

const ItemDetailsAlignment: Record<ItemDetailVariants, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Confirmed = styled(Typography)`
  margin-bottom: 4px;
`;

export const StyledInteraction = styled(InteractionsView)`
  border-radius: 4px;
  box-shadow: none;
`;

export const ItemContainer = styled.div`
  margin-bottom: 8px;
  border-radius: 4px;
  background: ${(props) => props.theme.grey.noshade};

  .section {
    padding: 16px 16px 8px 16px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    white-space: nowrap;
    flex-wrap: wrap;

    .delivery-section {
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .shipping-from {
        margin-right: 80px;
      }
    }

    :not(:last-child) {
      border-bottom: 1px solid ${(props) => props.theme.grey.shade3};
    }

    @media (max-width: 550px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .item {
    display: block;

    .item-detail-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;

      :not(:last-child) {
        margin-bottom: 24px;
      }
    }
  }

  /* Utility classes */
  .wrap-text {
    white-space: normal;
  }

  .wrap-content {
    flex-wrap: wrap;
  }
`;

export const ItemDetail = styled.div<{
  type: ItemDetailVariants;
  row?: boolean;
}>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  align-items: ${({ type }) => ItemDetailsAlignment[type]};
  margin-bottom: 8px;

  img {
    height: 56px;
    width: 56px;
    border-radius: 4px;
    margin-right: 16px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 1135px) {
    align-items: flex-start;
  }

  @media ${BREAKPOINTS.sm} {
    align-items: ${(props) => (props.row ? 'center' : 'flex-start')};
  }
`;

export const RightContent = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-wrap: nowrap;
  }
`;

export const Tag = styled.div`
  padding: 4px 8px;
  background-color: ${(props) => props.theme.grey.shade2};
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

export const StyledTouchable = styled(TouchableView)`
  display: flex;
  align-items: center;
  padding: 0 2px;

  .svg-container {
    margin-right: 6px;
    margin-bottom: 2px;
  }
`;
