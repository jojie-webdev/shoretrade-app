import Interaction from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
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
    padding-bottom: 32px;
  }
`;

// Shared Between InTransit and Delivered
export const DeliveryItem = styled(Interaction)`
  padding: 24px;
  margin-bottom: 16px;

  .content {
    .top {
      display: flex;
      align-items: center;

      .delivery-date {
        margin-right: 4px;
      }
    }
  }
`;
