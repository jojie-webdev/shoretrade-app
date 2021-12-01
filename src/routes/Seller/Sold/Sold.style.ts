import Interaction from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 32px;
  }

  .emptystate-row {
    height: 100%;
  }

  .controls-row {
    width: 100%;
    margin-bottom: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .tabs {
    width: 330px;

    .main-tab {
      padding: 4px 8px;
    }

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
      margin-bottom: 16px;
    }
  }

  .search {
    width: 280px;
    height: 40px;
    background: ${({ theme }) => theme.grey.shade9};
    border: 0;
    color: ${({ theme }) => theme.grey.shade7};

    input {
      background: ${({ theme }) => theme.grey.shade9};
      color: ${({ theme }) => theme.grey.shade7};

      ::placeholder {
        color: ${({ theme }) => theme.grey.shade7};
      }
    }

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
    }
  }
`;

// Shared Between InTransit and Delivered
export const DeliveryItem = styled(Interaction)`
  padding: 24px;
  margin-bottom: 16px;

  .content {
    .order-details-top {
      margin-bottom: 8px;
      & > div {
        display: inline-block;
        margin-right: 48px;
      }
    }

    .order-details-bottom {
      display: flex;
      align-items: center;
      /* Due to the typography having extra white space on the top and bottom
        This is needed to compensate and align the icon and text */
      margin-top: -5px;

      .delivery-date {
        margin-right: 4px;
      }
    }
  }
`;

export const SearchFilterRow = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SearchContainer = styled.div`
  width: 280px;
  height: 40px;
  position: relative;
`;

export const DateRangeContainer = styled.div`
  width: 100%;
  max-width: 280px;
  position: relative;
  bottom: 10px; //offset
`;
