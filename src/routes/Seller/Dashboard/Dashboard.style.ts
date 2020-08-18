import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .title-col {
    margin-bottom: 8px;
  }
`;

export const FilterRow = styled(Row)`
  margin-bottom: 24px;

  .filter-col {
    display: flex;
    align-items: center;

    .btn {
      margin-right: 12px;
    }
  }
`;

export const SalesCard = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;

  .overline {
    margin-bottom: 8px;
  }
`;

export const TotalSalesRow = styled(Row)`
  margin-bottom: 32px;
`;

export const MonthlyRow = styled(Row)``;
