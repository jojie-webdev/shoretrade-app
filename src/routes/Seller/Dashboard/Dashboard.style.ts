import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const FilterRow = styled(Row)`
  .filter-col {
    display: flex;
    align-items: center;

    .btn {
      margin-right: 12px;
    }
  }
`;
