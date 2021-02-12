import { Form } from 'formik';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const CCImageRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin-bottom: 32px;
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

export const FormAddCard = styled(Form)`
  & > * {
    margin-bottom: 24px;
  }

  .form-card-checkbox {
    margin-top: -24px;
  }

  .form-card-col {
    margin-bottom: 24px;
  }
`;
