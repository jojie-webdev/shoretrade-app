import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  padding: 0px 0px 50px 0px;
  .add-box-container {
    margin-top: 32px;
  }
  .actions-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 50px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #09131d;
  border-radius: 4px;
  margin-top: 32px;
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: row;

  .order-details-item {
    display: flex;
    flex-direction: column;
    margin-right: 32px;
  }

  .order-details-item-value {
    margin-top: 2px;
  }
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .tags-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .size-container {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
  }
  .size-label {
    margin-right: 8px;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ItemImage = styled.img`
  width: 148px;
  height: 148px;
  margin-right: 16px;
  border-radius: 4px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background: ${(props) => props.theme.grey.shade9};
  margin-top: 16px;
  .box-item {
    display: flex;
    flex-direction: column;
    margin-right: 48px;
  }
`;

export const BoxDetailsContainer = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  padding: 16px 24px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text-container {
    display: flex;

    .inner-text {
      margin-right: 40px;

      .overline {
        margin-bottom: 2px;
      }
    }
  }
`;

export const BoxSummaryContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  padding: 24px;
  width: 100%;
  background: ${(props) => props.theme.grey.shade9};

  .text-container {
    display: flex;

    .inner-text {
      margin-right: 32px;
    }
  }
`;
