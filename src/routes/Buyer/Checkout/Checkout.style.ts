import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  //height: 100%;
  //padding: 0 8px 48px 8px;
  //position: relative;

  .order-summary {
    margin-bottom: 16px;
  }

  .checkout-shipping {
    margin-top: 32px;
    margin-bottom: 16px;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .accordion-container {
    margin-bottom: 8px;
    padding-top: 0px;
  }

  .accordion-content-container {
    background: ${(props) => props.theme.grey.noshade};
    padding: 24px;
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
  //@media (min-width: 577px) and (max-width: 747px) {
  //  display: none;
  //}
  //
  //@media (min-width: 769px) and (max-width: 1110px) {
  //  display: none;
  //}
`;

export const Footer = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .footer-separator {
    margin-top: 24px;
    padding-top: 24px;
    border-top: 1px solid ${(props) => props.theme.grey.shade5};
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .keep-shopping-wrapper {
    margin-right: 16px;
  }
`;
