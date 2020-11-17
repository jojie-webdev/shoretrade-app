import Alert from 'components/base/Alert';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const TextFieldRow = styled(Row)`
  margin-top: 16px;

  .textfield-col {
    margin-bottom: 24px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
