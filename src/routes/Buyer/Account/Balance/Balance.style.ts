import Interactions from 'components/base/Interactions';
import InteractionCreditCard from 'components/module/InteractionCreditCard';
import { Col, Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 0px 8px;
`;

export const ContentLeft = styled(Col)`
  & > * {
    margin-bottom: 18px;
  }
`;

export const ContentRight = styled(Col)`
  & > * {
    margin-bottom: 18px;
  }
`;

export const CreditBalance = styled.div``;

export const CreditWrapper = styled.div`
  margin-top: 8px;
`;

export const LinkCreditHistory = styled(Interactions)`
  margin-bottom: 18px;
`;

export const LinkCreditCard = styled(InteractionCreditCard)`
  max-height: 70px;
`;
