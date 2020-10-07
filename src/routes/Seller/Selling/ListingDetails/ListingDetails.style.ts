import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .wrapper {
    width: calc(100% - 100px);
    margin: auto;

    @media (min-width: 992px) {
      padding-right: 50px;
    }

    @media (min-width: 769px) and (max-width: 991px) {
      width: calc(100% - 200px);
    }

    @media (max-width: 768px) {
      width: 80%;
    }

    @media (max-width: 576px) {
      width: 100%;
      padding: 0 24px;
    }
  }

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

  .carousel-container {
    width: 100%;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .details-container {
    padding: 24px;
    background-color: ${({ theme }) => theme.grey.noshade};
    width: calc(100% - 100px);
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;

    @media (max-width: 991px) {
      width: 100%;
    }
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

  @media (max-width: 991px) {
    margin-top: 32px;
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
    justify-content: space-between;
    /* & p:not(:last-child) {
      margin-right: 24px;
    } */
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;

  & button {
    width: 50%;
  }

  & button:not(:last-child) {
    margin-right: 16px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;

  & button {
    width: 100%;
  }
`;
