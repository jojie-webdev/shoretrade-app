import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const HeaderRow = styled(Row)`
  margin-bottom: 32px;
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  height: 40px;

  .btn-text {
    margin-right: 4px;
  }
`;

export const StockSummaryRow = styled(Row)`
  margin-bottom: 40px;
`;

export const StockContainer = styled.div`
  display: flex;
  align-items: center;

  .text {
    margin: 0 8px;
  }
`;
