import Interaction from 'components/base/Interactions';
import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  width: 100%;

  .emptystate-row {
    height: 100%;
  }

  .controls-row {
    width: 100%;
    margin-bottom: 32px;
  }

  @media ${BREAKPOINTS['md']} {
    padding-bottom: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) => (props.isIOS ? IOSBOTTOMPADDING : 0)};
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
  width: 480px;
  position: relative;
`;

export const DateRangeContainer = styled.div`
  width: 100%;
  max-width: 280px;
  position: relative;
  bottom: 10px; //offset
`;
