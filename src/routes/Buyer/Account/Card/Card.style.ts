import { Form } from 'formik';
import styled from 'utils/styled';

export const Container = styled.div``;

export const CCImageRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  margin-bottom: 44px;
`;

export const CCImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${(props) => `2px solid ${props.theme.grey.shade3}`};
  padding: 0px 4px;
  border-radius: 5px;
  height: 32px;
  width: 54px;
  margin-right: 16px;
  & > svg {
    vertical-align: middle;
  }
`;

export const FormAddCard = styled(Form)`
  & > * {
    margin-bottom: 32px;
  }
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
