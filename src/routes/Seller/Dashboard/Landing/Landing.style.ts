import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .title-col {
    margin-bottom: 8px;
  }
`;

export const FilterRow = styled(Row)`
  .filter-col {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 24px;
    }

    .btn {
      margin-right: 8px;
      margin-bottom: 24px;
      height: 40px;

      p {
        color: #ffffff;
      }

      @media ${BREAKPOINTS['sm']} {
        margin-bottom: 8px;
      }
    }

    .btn-abso {
      height: 40px;

      p {
        color: #ffffff;
      }

      @media ${BREAKPOINTS['sm']} {
        position: absolute;
        right: 0;
        margin-right: 16px;
      }
    }
  }

  .modal-col {
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 0px;
    }
  }
`;

export const MobileFilterContainer = styled.div`
  overflow: auto;
`;

export const MobileFilterRow = styled(Row)`
  @media ${BREAKPOINTS['sm']} {
    margin-top: 36px;
  }

  .btn {
    margin-right: 12px;
    margin-bottom: 24px;
    padding: 14px;
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 8px;
    }
  }

  .btn-abso {
    @media ${BREAKPOINTS['sm']} {
      position: absolute;
      right: 0;
      margin-right: 16px;
    }
  }
  .modal-col {
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 0px;
    }
  }
`;

export const MobileFilterButton = styled(Button)`
  background-color: ${(props) =>
    props.variant === 'unselected' && props.theme.grey.shade8};
`;

export const TotalSalesRow = styled(Row)`
  margin-bottom: 32px;
  overflow: auto;
`;

export const MonthlyRow = styled(Row)`
  margin-left: 0px !important;
  padding: 0px !important;

  .many-cards {
    width: 202px;
  }
`;
export const SalesRow = styled(Row)`
  margin-left: 0px !important;
  padding: 0px !important;

  @media ${BREAKPOINTS['sm']} {
    .figma-width {
      width: 170px !important;
      min-width: 170px;
    }

    .pending-card {
      width: 170px !important;
      min-width: 170px;
    }
  }

  @media ${BREAKPOINTS['genericTablet']} {
    .figma-width {
      width: 190px !important;
      min-width: 190px;
    }
  }

  @media ${BREAKPOINTS['xl']} {
    .figma-width {
      width: 200px !important;
      min-width: 200px;
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
    padding: 16px;
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

export const TotalSalesCard = styled.div`
  padding: 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  margin-left: 16px;
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
    padding: 16px;
  }

  @media ${BREAKPOINTS['genericTablet']} {
    width: 190px !important;
    min-width: 190px;
  }
`;
