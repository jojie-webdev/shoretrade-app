import Alert from 'components/base/Alert';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const InputRow = styled(Row)`
  margin-bottom: 8px;

  .input-col {
    margin-bottom: 24px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
