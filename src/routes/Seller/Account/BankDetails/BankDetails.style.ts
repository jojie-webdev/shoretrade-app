import Alert from 'components/base/Alert';
import styled from 'utils/styled';

export const Container = styled.div``;

export const TextFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;

  .textfield-col {
    margin-bottom: 24px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
