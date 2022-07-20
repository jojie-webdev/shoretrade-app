import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';

const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 4px;
  margin-right: 16px;
`;

export const Wrapper = styled.div<{ isCreatListingSuccess?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .modal_backdrop_color {
    ${({ theme }) => theme.isSFM && 'background-color: rgba(15, 16, 36, 0.9)'};
  }

  .modal_container {
    border-radius: 24px;
    width: 686px;
    background-color: ${({ theme }) => theme.grey.shade10};
    padding: 56px 45px;
  }

  .confirmation_modal__cancel_btn > p {
    text-transform: capitalize;
    font-size: 15px;
    letter-spacing: 0px;
    font-weight: normal;
  }

  .confirmation_modal__ok_btn > p {
    text-transform: capitalize;
    font-size: 15px;
    letter-spacing: 0px;
    font-weight: normal;
  }

  .modal_container__exit_btn {
    width: 56px;
    height: 56px;
    border-radius: 56px;
    background-color: ${({ theme }) => theme.grey.shade9};
    right: -24px;
    top: -30px;
    border: 2px solid ${({ theme }) => theme.grey.shade8};

    svg {
      width: 15px;
      height: 15px;

      path {
        fill: ${({ theme }) => theme.grey.noshade};
      }
    }
  }

  .wrapper {
    width: 100%;

    .card-container {
      @media ${BREAKPOINTS['xl']} {
        padding-left: 0px !important;
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

export const CarouselContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const SellerPreview = styled.img`
  ${imgStyle}
`;

export const SalesCard = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  width: 100%;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
  margin-bottom: 32px;

  .sales-container {
    display: flex;
    align-items: center;
    flex-direction: row;

    .per-label {
      margin-left: 4px;
    }
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
`;

export const SalesDetailsCard = styled.div<{ isCreatListingSuccess?: boolean }>`
  padding: 16px;
  background-color: ${({ theme, isCreatListingSuccess }) =>
    !isCreatListingSuccess ? theme.grey.noshade : theme.grey.shade9};
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

      > div {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .price-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 33px;
    margin-bottom: 37px;

    .per-label {
      margin-left: 6.5px;
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
  padding: 18px 18px 18px 30px;
  background-color: ${({ theme }) => theme.grey.noshade};
  margin-bottom: 40px;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  border-radius: 8px;
  width: 100%;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 8px;
  }

  .left-content {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;

    .left-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .left-text-container {
    display: flex;
    flex-direction: column;
  }

  .end-left-content {
    display: flex;
    flex-direction: row;
    margin-top: 8px;

    @media ${BREAKPOINTS['sm']} {
      align-items: center;
      margin-top: 0;
    }

    .pen-container {
      margin-right: 16px;

      @media ${BREAKPOINTS['iPad']} {
        margin-right: 4px;
      }
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
    margin-top: 8px;
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
    margin-top: 10px;
    margin-bottom: 1rem;
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
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .product-details {
    margin-top: 24px;
    width: 100%;

    .tags-container {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      margin-bottom: 1rem;
    }
  }

  .size-location-container {
    display: flex;
    flex-direction: row;
    margin-top: 8px;

    @media ${BREAKPOINTS['sm']} {
    }
  }

  .packaging-container {
    display: flex;
    flex-direction: row;
    margin-top: 8px;

    svg {
      margin-left: -3px;
      margin-right: 4px;
    }
  }

  .size-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 10px;
    @media ${BREAKPOINTS['sm']} {
    }
  }

  .location-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-left: -3px;
      margin-right: 4px;
    }
  }

  .label-container {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
  }
`;

export const ProductLabelMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;

  .product-value {
    margin-left: 6.5px;
  }
`;

export const Progress = styled.div<{ percent: number; height?: string }>`
  width: ${({ percent }) => `${percent}%`};
  height: ${({ height }) => height || '4px'};
  background-color: ${({ theme }) => theme.brand.success};
  position: absolute;
`;

export const ListingCard = styled.div<{ isCreatListingSuccess?: boolean }>`
  padding: 16px;
  background-color: ${({ isCreatListingSuccess, theme }) =>
    isCreatListingSuccess ? theme.grey.shade9 : theme.grey.noshade};
  width: 100%;
  border-radius: 4px;
  border: ${({ theme, isCreatListingSuccess }) =>
    isCreatListingSuccess ? 'none' : `1px solid ${theme.grey.shade3}`};

  .seller-details-container {
    display: flex;
    flex-direction: row;

    .seller-container {
      display: flex;
      flex-direction: column;
      margin-top: 3%;

      > div {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }
`;

export const MobileSalesCard = styled(ListingCard)`
  margin-top: 24px;

  .sales-container {
    display: flex;
    flex-direction: row;

    .per-label {
      margin-left: 4px;
    }
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
`;
