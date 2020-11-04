import AccordionView from 'components/base/Accordion';
import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';
import styled from 'utils/styled';

import { ItemDetailVariants } from '../Orders.props';

const ItemDetailsAlignment: Record<ItemDetailVariants, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const Confirmed = styled(Typography)`
  margin-bottom: 4px;
`;

export const StyledInteraction = styled(Interaction)`
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
`;

export const RightContent = styled.div`
  flex: 1.2;
  display: flex;
  justify-content: space-between;

  @media (max-width: 425px) {
    flex-wrap: wrap;
  }
`;

export const Tag = styled.div`
  padding: 4px 8px;
  background-color: ${(props) => props.theme.grey.shade2};
  border-radius: 4px;
  margin-right: 4px;
  margin-bottom: 4px;
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.1s ease;
  z-index: 1;
`;

export const LeftContainer = styled(Col)``;

export const AccordionContainer = styled.div`
  background-color: #fff;

  // shadow-color: rgba(41, 43, 50, 0.12);
  shadow-opacity: 0.34;
  shadow-radius: 6.27;
  shadow-offset: 0 5px;
  elevation: 5;
  // margin-left: 16px;
  // margin-right: 16px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);

  // border: 1px solid blue;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledAccordion = styled(AccordionView)`
  margin-bottom: 16px;
`;

export const OrderBadge = styled.div`
  padding: 8px 16px;
  background: ${(props) => props.theme.grey.shade3};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 24px;
  white-space: nowrap;
`;
