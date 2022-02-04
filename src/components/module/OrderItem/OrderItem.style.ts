import TouchableView from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const OrderItemContainer = styled.div`
  :not(:last-child) {
    margin-bottom: 8px;
  }

  @media ${BREAKPOINTS['sm']} {
    :not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;

export const OrderInfoContainer = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  padding: 16px 16px 10px 16px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid ${({ theme }) => theme.grey.shade3};

  .end-text {
    text-align: right;
  }

  @media ${BREAKPOINTS['sm']} {
    border: none;
    border-radius: 0;

    .end-text {
      text-align: left;
    }

    .btn-rate-seller {
      margin: auto 0 auto auto !important;
    }

    .detail-container {
      margin-bottom: 8px;
    }
  }
`;

export const OrderItemsContainer = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.grey.noshade};
  border: 1px solid ${({ theme }) => theme.grey.shade3};
  border-top: none;

  .item {
    background: ${({ theme }) => theme.grey.shade1};
    border: 1px solid ${({ theme }) => theme.grey.shade3};
    border-radius: 12px;
    padding: 4px 8px !important;

    img {
      height: 48px;
      width: 48px;
      border-radius: 6px;
      margin-right: 8px;
    }

    :not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .end-text {
    text-align: right;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 8px 0;
    background: none;
    border: none;
    border-radius: 0;

    .end-text {
      text-align: left;
      font-size: 12px;
    }

    .value {
      font-size: 14px;
    }

    img {
      margin-bottom: 4px;
    }

    .item {
      padding: 8px !important;
    }

    .detail-container {
      margin-bottom: 8px;
    }
  }
`;

export const OrderTotalContainer = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  padding: 16px 16px 10px 16px;
  border: 1px solid ${({ theme }) => theme.grey.shade3};
  border-top: none;

  .end-text {
    text-align: right;
  }

  @media ${BREAKPOINTS['sm']} {
    background: none;
    border: none;
    margin-bottom: 8px;

    .end-text {
      text-align: left;
    }

    .total-container {
      margin-top: 8px;
    }
  }
`;

export const OrderShippingContainer = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  padding: 16px 16px 10px 16px;
  border: 1px solid ${({ theme }) => theme.grey.shade3};
  border-top: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;

  .end-text {
    text-align: right;
  }

  .btn-raise-dispute {
    margin-right: 8px;
  }

  @media ${BREAKPOINTS['sm']} {
    background: none;
    border: none;
    border-radius: 0;

    .end-text {
      text-align: left;
    }

    .detail-container {
      margin-bottom: 8px;
    }
  }

  @media ${BREAKPOINTS['md']} {
    .btn-raise-dispute {
      margin-right: 0;
    }

    .detail-container:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  @media ${BREAKPOINTS['xl']} {
    .btn-raise-dispute {
      margin-right: 0;
    }
  }
`;

export const Tag = styled.div<{
  background?: string;
}>`
  width: fit-content;
  padding: 6px 8px 4px 8px;
  background-color: ${({ theme, background }) =>
    background ? background : theme.grey.shade3};
  border-radius: 8px;
  margin-bottom: 4px;
  margin-right: 4px;

  @media ${BREAKPOINTS.sm} {
    padding: 4px 6px 2px 6px;
    border-radius: 6px;
    p {
      font-size: 8px;
    }
  }

  @media ${BREAKPOINTS.md} {
    p {
      font-size: 8px;
    }
  }
`;

export const ItemDetailLabel = styled(Typography)`
  @media ${BREAKPOINTS.sm} {
    font-size: 10px;
  }

  @media ${BREAKPOINTS.md} {
    font-size: 10px;
  }

  @media ${BREAKPOINTS.xl} {
    font-size: 10px;
  }
`;

export const ItemDetailValue = styled(Typography)`
  @media ${BREAKPOINTS.sm} {
    font-size: 12px;
  }

  @media ${BREAKPOINTS.md} {
    font-size: 12px;
  }

  @media ${BREAKPOINTS.xl} {
    font-size: 12px;
  }
`;

export const FlexiContainer = styled.div<{ justifyReversed?: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ justifyReversed }) =>
    justifyReversed ? 'flex-end' : 'flex-start'};

  > * {
    align-self: center;
  }

  @media ${BREAKPOINTS['sm']} {
    justify-content: ${({ justifyReversed }) =>
      justifyReversed ? 'flex-start' : 'flex-end'};
  }
`;

export const StyledTouchable = styled(TouchableView)<{
  bgColor?: string;
}>`
  display: flex;
  align-items: center;
  padding: 0 6px;
  background: ${({ theme, bgColor }) => bgColor ?? theme.grey.shade2};

  &:hover {
    background: ${({ theme, bgColor }) => bgColor ?? theme.grey.shade2};
  }

  .svg-container {
    margin-right: 6px;
    margin-bottom: 2px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;

  button {
    margin-left: 8px;
  }
`;
