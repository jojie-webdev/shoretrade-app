import { Row, Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div``;

export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-col {
    margin-bottom: 16px;
  }
`;

export const SmallAlertContainer = styled.div`
  padding: 8px;
  width: 100%;
  background: rgba(255, 207, 92, 0.12);
  border-radius: 4px;
  margin-bottom: 16px;

  display: flex;
  align-items: flex-start;

  .icon-container {
    margin-right: 8px;
  }

  .text {
    margin-top: 6px;
  }
`;
