import Alert from 'components/base/Alert';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;
export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-container {
    margin-bottom: 24px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
