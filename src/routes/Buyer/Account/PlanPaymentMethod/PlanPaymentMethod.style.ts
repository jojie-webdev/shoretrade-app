import InteractionCreditCard from 'components/module/InteractionCreditCard';
import { Col, Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const BreadcrumbsContainer = styled.div`
  margin-bottom: 40px;
`;

export const CCImageCol = styled(Col)`
  > div {
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 8px;
    display: flex;
    width: 48px;
    justify-content: center;
    background: ${({ theme }) => theme.grey.noshade};
  }
`;

export const FormContainer = styled.div`
  margin-top: 25px;
`;

export const FormikRow = styled(Row)`
  margin-top: 16px;
`;

export const CreditCardInteraction = styled(InteractionCreditCard)`
  max-height: 74px;
  margin-top: 12px;
`;

export const ButtonMobileContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.grey.shade2};
  padding: 12px 24px;
  width: 100%;
`;
