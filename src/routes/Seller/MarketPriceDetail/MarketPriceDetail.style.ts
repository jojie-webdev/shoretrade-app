import styled from 'utils/styled';

export const Container = styled.div`
  .header-row {
    margin-bottom: 32px;
  }

  .stock-summary-row {
    margin-bottom: 40px;
  }
`;

export const FilterButton = styled.button`
  background: #09131d;
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

export const StockContainer = styled.div`
  display: flex;
  align-items: center;

  .text {
    margin: 0 8px;
  }
`;
