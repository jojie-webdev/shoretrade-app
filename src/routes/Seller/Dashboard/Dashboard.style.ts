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

export const TotalSalesRow = styled(Row)`
  margin-bottom: 32px;
`;

export const MonthlyRow = styled(Row)``;

export const MonthlyContainer = styled.div`
  margin-bottom: 32px;
  overflow: auto;
`;

export const TopCategoriesContainer = styled.div`
  overflow: auto;
`;

export const SalesCard = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;

  .price {
    margin-bottom: 16px;
  }

  .overline {
    margin-bottom: 8px;
  }
`;

export const ChartContentContainer = styled.div`
  display: flex;
  align-items: center;

  .text {
    margin: 0 12px 0 4px;
  }
`;

export const IllustrationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left-content {
    display: flex;
    align-items: center;

    .text {
      margin-left: 4px;
    }
  }
`;
