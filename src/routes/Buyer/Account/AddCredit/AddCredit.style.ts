import { Form } from 'formik';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 0px 8px;
`;

export const Content = styled.div``;

export const FormAddCredit = styled(Form)`
  margin-top: 24px;

  & > * {
    margin-bottom: 24px;
  }
`;

export const CreditInput = styled.input<{ error: boolean }>`
  font-size: 24px;
  line-height: 32px;
  padding: 16px;
  margin: 8px 0 24px 0;
  border-radius: 4px;
  background-color: ${(props) => props.theme.grey.noshade};
  border: 1px solid;
  border-color: ${(props) =>
    props.error ? props.theme.brand.error : props.theme.grey.shade5};
`;

export const Footer = styled.div`
  padding: 16px 24px 16px 24px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.grey.shade2};
`;
