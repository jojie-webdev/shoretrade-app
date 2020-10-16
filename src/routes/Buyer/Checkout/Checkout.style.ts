import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  padding: 0 8px 48px 8px;
  position: relative;

  .row {
    height: 100%;
  }

  .order-summary {
    margin-bottom: 16px;
  }

  .checkout-shipping {
    margin-top: 32px;
    margin-bottom: 16px;
  }
`;

export const Footer = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .box-error-container {
    margin-bottom: 24px;
  }

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
