import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const HeaderRow = styled(Row)`
  margin-bottom: 24px;

  .header {
    display: flex;
    align-items: center;

    .icon-container {
      margin-right: 8px;
    }
  }
`;

export const InputRow = styled(Row)`
  margin-bottom: 8px;

  .input-col {
    margin-bottom: 24px;
  }
`;
