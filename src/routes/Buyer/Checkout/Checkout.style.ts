import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 150px;
  }

  .order-summary {
    margin-bottom: 16px;
  }

  .accordion-container {
    margin-bottom: 8px;
    padding-top: 0px;

    .border {
      display: none;
    }

    .accordion-content-wrapper {
      @media ${BREAKPOINTS['sm']} {
        padding: 0;
      }
    }
  }

  .accordion-content-container {
    padding: 24px 0 0 0;
  }
`;

export const EmptyContainer = styled.div`
  .row {
    @media ${BREAKPOINTS['sm']} {
      justify-content: center !important;
      margin-bottom: 32px;
    }
  }

  .svg-col-spacer {
    @media ${BREAKPOINTS['sm']} {
      display: none;
    }
  }
`;

export const CheckoutCardRow = styled(Row)`
  @media ${BREAKPOINTS['sm']} {
    background-color: #ffffff;
    border: 2px solid ${({ theme }) => theme.grey.shade2};
    border-bottom: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export const CrateFee = styled.div`
  display: flex;
  padding: 16px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);

  .crate-fee-label {
    display: flex;
    margin: auto auto auto 0;

    svg {
      margin: auto 16px auto 0;
    }
  }

  .crate-fee-value {
    margin: auto 50px auto auto;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
    border-radius: 0;
    border: 2px solid ${({ theme }) => theme.grey.shade2};
    border-top: none;
    box-shadow: none;

    .crate-fee-value {
      margin: auto 0 auto auto;
    }
  }
`;

export const ShippingRow = styled(Row)`
  .checkout-shipping {
    margin-top: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 0;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
    background-color: #ffffff;
    border: 2px solid ${({ theme }) => theme.grey.shade2};
    border-top: 1px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 2;

    @media ${BREAKPOINTS['sm']} {
      width: 240px;
      height: 240px;
    }

    @media ${BREAKPOINTS['md']} {
      width: 240px;
      height: 240px;
    }
  }

  :before {
    position: absolute;
    content: '';
    width: 280px;
    height: 280px;
    border-radius: 50%;
    z-index: 1;
    background: ${(props) => props.theme.grey.shade3};

    @media ${BREAKPOINTS['sm']} {
      width: 250px;
      height: 250px;
    }

    @media ${BREAKPOINTS['md']} {
      width: 250px;
      height: 250px;
    }
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
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    margin-top: 16px;

    button {
      width: 50%;
    }
  }

  .balances {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px 8px 24px;
    border-bottom: 1px solid ${({ theme }) => theme.grey.shade5};
  }
`;
