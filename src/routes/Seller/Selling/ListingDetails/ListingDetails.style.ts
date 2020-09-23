import { Container } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled(Container)`
  .separator {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.grey.shade2};
    margin: 16px 0px;
  }
`;

export const DetailsCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .details-container {
    padding: 24px;
    background-color: ${({ theme }) => theme.grey.noshade};
    width: calc(100% - 96px);
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
  }
  .size-location-container {
    display: flex;
    flex-direction: row;
    margin-top: 8px;
  }

  .size-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
  }

  .location-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 6px;
    }
  }

  .tags-container {
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    & div:not(:last-child) {
      margin-right: 4px;
    }
  }

  .seller-container {
    display: flex;
    flex-direction: column;
  }

  .ratings-container {
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    & svg:not(:last-child) {
      margin-right: 6px;
    }
  }
`;

export const Tag = styled.div`
  padding: 2px 8px;
  background-color: ${({ theme }) => theme.grey.shade2};
  border-radius: 2px;
`;

export const SellerPreview = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const SalesCard = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  width: 100%;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
  & p:not(:first-child) {
    margin-top: 4px;
  }
`;

export const OrderBoxCard = styled.div`
  padding: 24px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 32px;

  .order-details-row {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    & div:not(:last-child) {
      margin-right: 32px;
    }
  }

  .order-details-item {
    display: flex;
    flex-direction: column;
    & p:not(:first-child) {
      margin-top: 4px;
    }
  }
  .box-details-row {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
    & p:not(:last-child) {
      margin-right: 24px;
    }
  }
`;
