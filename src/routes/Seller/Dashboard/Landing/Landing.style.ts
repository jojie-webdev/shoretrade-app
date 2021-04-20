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
  .filter-col {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .btn {
      margin-right: 12px;
      margin-bottom: 24px;

      @media ${BREAKPOINTS['sm']} {
        margin-bottom: 8px;
      }
    }
  }
`;

export const TotalSalesRow = styled(Row)`
  margin-bottom: 32px;
`;

export const MonthlyRow = styled(Row)`
  .many-cards {
    width: 202px;
  }
`;
export const SalesRow = styled(Row)`
  width: 100%;
  padding-left: 24px;

  @media ${BREAKPOINTS['sm']} {
    .figma-width {
      width: 156px !important;
      min-width: 156px;
    }
  }
`;

export const MonthlyContainer = styled.div`
  margin-bottom: 32px;
  overflow: auto;
`;

export const TopCategoriesContainer = styled.div`
  overflow: auto;
  margin-bottom: 40px;
`;

export const SalesCard = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  margin-right: 24px;
  width: 308px;
  min-width: 202px;
  height: 100%;
  .price {
    margin-bottom: 16px;
  }

  .overline {
    margin-bottom: 8px;
  }

  @media ${BREAKPOINTS['sm']} {
    width: 170px !important;
    min-width: 170px;
    margin-right: 16px;
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

export const NotificationsContainer = styled.div`
  margin-bottom: 32px;

  .content-container {
    cursor: pointer;
  }
`;
