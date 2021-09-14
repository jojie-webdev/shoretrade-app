import CreditCard from 'components/module/CreditCardCard/CreditCardCard.view';
import InteractionCreditCard from 'components/module/InteractionCreditCard/InteractionCreditCard.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .header-text {
    font-family: 'Media Sans';
    margin-bottom: 20px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 150px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .box-error-container {
    margin-bottom: 24px;
  }

  .payment-methods {
    margin-bottom: 40px;

    .payment-method-col {
      @media ${BREAKPOINTS['sm']} {
        padding: 0 8px !important;
      }

      .tooltip {
        position: absolute;
        right: 12%;
        bottom: 12%;
      }
      .tooltip .tooltip-text {
        visibility: hidden;
        width: 150px;
        background-color: black;
        color: ${(props) => props.theme.grey.noshade};
        text-align: center;
        border-radius: 6px;
        padding: 8px;
        position: absolute;
        z-index: 1;
        right: 30%;
        top: 150%;
      }

      .tooltip:hover .tooltip-text {
        visibility: visible;
      }
    }
  }

  .cc-image-row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 32px;
  }

  .cc-title {
    margin-bottom: 32px;
  }

  .form-card-col {
    margin-bottom: 24px;
  }

  .form-card-checkbox {
    margin-bottom: 60px;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${BREAKPOINTS['genericTablet']} {
    flex-direction: column-reverse;
    align-items: flex-end;
  }

  .btns-container {
    display: flex;
    margin-bottom: 10px;

    .pay-btn {
      min-width: 210px;
    }
  }

  .balances {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background-color: #ffffff;
    border: 1px solid ${({ theme }) => theme.grey.shade3};
    border-radius: 8px;
    min-width: 357px;
    margin-bottom: 10px;

    @media ${BREAKPOINTS['genericTablet']} {
      min-width: 100%;
      justify-content: flex-end;
      margin-bottom: 32px;
    }

    .total-value {
      @media ${BREAKPOINTS['genericTablet']} {
        margin: 0 26px;
      }
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 8px 0;
  background-color: ${({ theme }) => theme.grey.shade2};

  .btns-container {
    padding: 0 24px;
    margin-top: 16px;
  }

  .balances {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 8px 24px;
    border-bottom: 1px solid ${({ theme }) => theme.grey.shade5};
  }
`;

export const MobileTopRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 20px;
  margin: -20px -20px 0 -20px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  .method {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 116px;
    height: 80px;
    padding: 14px 4px 8px 4px;
    background-color: #ffffff;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    margin-right: 16px;
  }

  .method-active {
    background-color: ${({ theme }) => theme.grey.shade8};
    box-shadow: none;

    img {
      //primary
      filter: invert(46%) sepia(86%) saturate(3223%) hue-rotate(347deg)
        brightness(98%) contrast(82%);
    }

    p {
      color: #ffffff;
    }
  }
`;

export const Method = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 221px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 19px 17px;
  margin-bottom: 24px;
  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};

  @media ${BREAKPOINTS['sm']} {
    height: 156px;
    border-radius: 12px;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    margin-bottom: 16px;
    padding: 12px;
  }

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.75)};
  }

  .radio {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .disabled-radio {
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.grey.shade4};
    border: 1.5px solid ${({ theme }) => theme.grey.shade5};
    border-radius: 100px;
  }
`;

export const CCImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 0 4px;
  box-shadow: 0 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 2px;
  height: 24px;
  width: 40px;
  margin-right: 16px;

  & > svg {
    vertical-align: middle;
  }
`;

export const CreditCardInteraction = styled(InteractionCreditCard)`
  max-height: 74px;
  margin-top: 12px;
`;

export const StyledCreditCard = styled(CreditCard)`
  border-radius: 12px;
  padding-right: 25px;
  margin-top: 8px;
`;

export const StyledTotalCardColumn = styled(Col)`
  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
`;
