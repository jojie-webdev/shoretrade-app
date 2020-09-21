import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;

  .title-col {
    margin-bottom: 8px;
  }
`;

export const SpinnerContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FilterRow = styled(Row)`
  margin-bottom: 24px;

  .filter-col {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .btn {
      margin-right: 12px;

      @media ${BREAKPOINTS['sm']} {
        margin-bottom: 8px;
      }
    }
  }
`;

export const TotalSalesRow = styled(Row)`
  margin-bottom: 32px;

  .paid-col {
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 8px;
    }
  }
`;

export const MonthlyRow = styled(Row)``;

export const MonthlyContainer = styled.div`
  margin-bottom: 32px;
  overflow: auto;
`;

export const TopCategoriesContainer = styled.div`
  overflow: auto;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 40px;
  }
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

export const CategoryImageContainer = styled.div`
  margin-left: 10px;
  height: 40px;
`;
