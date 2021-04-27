import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .wrapper {
    width: 100%;
  }

  .separator {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.grey.shade2};
    margin: 16px 0px;
  }

  .header-container {
    display: flex;
    flex-direction: row;
    padding: 18px;
    background-color: ${({ theme }) => theme.grey.noshade};
    margin-bottom: 40px;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    border-radius: 8px;
    width: 100%;
  }

  .breadcrumbs-container {
    margin-bottom: 40px;
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
    width: 100%;
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

// TODO :- should be a layout
const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
`;

export const NoProfilePic = styled.div`
  ${imgStyle}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #edeffa;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px;
  background-color: ${({ theme }) => theme.grey.noshade};
  margin-bottom: 40px;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  border-radius: 8px;
  width: 100%;

  .arrow-container {
    margin-top: 8px;
  }

  .left-content {
    margin-left: 28px;
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .label-container {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .end-left-content {
    display: flex;
    flex-direction: row;
    position: absolute;
    right: 1%;

    .pen-container {
      margin-right: 16px;
      margin-top: 8px;
    }
    .trash-container {
      margin-top: 8px;
    }
  }
`;

export const TopDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .size-location-container {
    display: flex;
    flex-direction: row;
    margin-top: 16px;
  }

  .size-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
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
    margin-bottom: 24px;
  }
`;

export const StyledTouchable = styled(Touchable)``;
