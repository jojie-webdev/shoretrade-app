import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  padding-bottom: 48px;
  position: relative;

  .row {
    height: 100%;
  }

  .order-summary {
    margin-bottom: 24px;
  }

  .checkout-shipping {
    margin-top: 32px;
    margin-bottom: 24px;
  }
`;

export const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
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
