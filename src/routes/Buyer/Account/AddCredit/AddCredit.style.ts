import CreditCardRow from 'components/module/CreditCardRow';
import { Form } from 'formik';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;

  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const FormAddCredit = styled(Form)`
  margin-top: 24px;

  .form-spacer {
    margin-bottom: 24px;
  }
`;

export const Field = styled(Col)`
  margin-bottom: 24px;
`;

export const CC = styled(CreditCardRow)`
  margin-top: 12px;
`;

export const Notification = styled.div`
  display: flex;
  border-radius: 4px;
  border: transparent;
  margin: 12px auto;
  & > div {
    flex: 1;
  }
`;
