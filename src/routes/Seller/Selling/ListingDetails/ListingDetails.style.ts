import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';

export const Wrapper = styled.div<{ isCreatListingSuccess?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .wrapper {
    width: 100%;

    .card-container {
      @media ${BREAKPOINTS['ipadPro']} {
        padding-left: 0px !important;
        margin-top: 23px !important;
      }
    }
  }

  .separator {
    width: 100%;
    height: 2px;
    background-color: ${({ theme, isCreatListingSuccess }) =>
      !isCreatListingSuccess ? theme.grey.shade2 : theme.grey.shade8};
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

export const SalesCard = styled.div<{ isCreatListingSuccess?: boolean }>`
  padding: 16px;
  background-color: ${({ theme, isCreatListingSuccess }) =>
    !isCreatListingSuccess ? theme.grey.noshade : theme.grey.shade9};
  width: 100%;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;

  @media (max-width: 991px) {
    margin-top: 32px;
  }

  .seller-details-container {
    display: flex;
    flex-direction: row;

    .seller-container {
      display: flex;
      flex-direction: column;
      margin-top: 3%;
      margin-left: 26px;
    }
  }

  .price-container {
    display: flex;
    flex-direction: row;
    margin-top: 33px;
    margin-bottom: 37px;

    .per-label {
      margin-left: 12.5px;
      margin-top: 10px;
    }
  }
`;

export const ProductDetailsContainer = styled.div<{
  isCreatListingSuccess?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;

  .separator {
    width: 100%;
    height: 2px;
    background-color: ${({ theme, isCreatListingSuccess }) =>
      !isCreatListingSuccess ? theme.grey.shade2 : theme.grey.shade8};
    margin: 16px 0px;
  }
`;

export const ProductLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .product-value {
    .product-desc {
      line-height: 12px;
    }
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

const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  margin-right: 16px;
  cursor: pointer;
`;

export const NoProfilePic = styled.div`
  ${imgStyle};
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

  @media ${BREAKPOINTS['ipadPro']} {
    padding: 12px;
  }

  .arrow-container {
    margin-top: 4px;
  }

  .left-content {
    margin-left: 28px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    @media ${BREAKPOINTS['ipadPro']} {
      margin-left: 0px;
    }

    .left-container {
      display: flex;
      flex-direction: row;
    }
  }

  .label-container {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .end-left-content {
    display: flex;
    flex-direction: row;

    .pen-container {
      margin-right: 16px;
      margin-top: 8px;
      @media ${BREAKPOINTS['iPad']} {
        margin-right: 4px;
      }
    }
    .trash-container {
      margin-top: 8px;
    }

    @media ${BREAKPOINTS['iPad']} {
      margin-left: 8px;
    }
  }
`;

export const TopDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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

  .success-listing-creation-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    .product-listed-desc {
      margin-top: 1.35%;
    }
  }
`;

export const StyledTouchable = styled(Touchable)``;

export const MobileWrapper = styled.div`
  .sales-container {
    display: flex;
    flex-direction: row;
  }

  .sold-container {
    margin-top: 4px;
    margin-bottom: 12px;
  }

  .progress-container {
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.grey.shade3};
    border-radius: 1px;
    position: relative;
  }

  .product-details {
    padding: 0px 16px;
    margin-top: 24px;

    .tags-container {
      display: flex;
      flex-direction: row;
      margin-top: 8px;
      & div:not(:last-child) {
        margin-right: 4px;
      }
      margin-bottom: 16px;
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

  .label-container {
    margin-top: 28px;
  }

  .test {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
  }
  .row-test {
    margin-top: 242px;
  }
`;

export const ProductLabelMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;

  .product-value {
    margin-left: 4px;
    .product-title-desc {
      line-height: 35px;
    }
  }
`;

export const Progress = styled.div<{ percent: number }>`
  width: ${({ percent }) => `${percent}%`};
  height: 4px;
  background-color: ${({ theme }) => theme.brand.success};
  position: absolute;
`;

export const MobileSalesCard = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  width: 100%;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;

  .seller-details-container {
    display: flex;
    flex-direction: row;

    .seller-container {
      display: flex;
      flex-direction: column;
      margin-top: 3%;
    }
  }

  .price-container {
    display: flex;
    flex-direction: row;
    margin-top: 33px;
    margin-bottom: 37px;

    .per-label {
      margin-left: 12.5px;
      margin-top: 10px;
    }
  }
`;
