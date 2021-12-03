import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const ScrollWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding-right: 16px;

  @media ${BREAKPOINTS['sm']} {
    padding-right: 0;
  }
`;

export const Wrapper = styled.div`
  .add-box-container {
    margin-top: 16px;

    > div {
      border-width: 2px;
      border-radius: 8px;
      border-color: ${({ theme }) => theme.brand.primary};
    }
  }

  .actions-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;
  }
`;

export const Description = styled.div`
  display: flex;
  margin-top: 12px;

  p:first-of-type {
    margin-right: 8px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: #09131d;
  border-radius: 4px;
  margin-top: 24px;
  border-radius: 8px;
`;

export const OrderDetails = styled.div`
  display: flex;
  flex-direction: row;

  @media ${BREAKPOINTS['sm']} {
    flex-direction: column;
  }

  .order-details-item {
    display: flex;
    flex-direction: column;
    margin-right: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin: 0 0 12px 0;
    }
  }

  .order-details-item-value {
    margin-top: 2px;
  }
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .tags-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .size-container {
    display: flex;
    flex-direction: row;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 4px;
    }
  }

  .size-label {
    margin-right: 8px;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 4px 0;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ItemImage = styled.img`
  width: 88px;
  height: 88px;
  margin-right: 16px;
  border-radius: 4px;

  @media ${BREAKPOINTS.sm} {
    height: 72px;
    width: 72px;
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  background: ${(props) => props.theme.grey.shade9};
  margin-top: 16px;

  .box-item {
    display: flex;
    flex-direction: column;
    margin-right: 48px;
  }
`;

export const BoxDetailsContainer = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 24px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;

  .text-container {
    display: flex;

    @media ${BREAKPOINTS['sm']} {
      flex-direction: column;
    }

    .inner-text {
      margin-right: 40px;

      @media ${BREAKPOINTS['sm']} {
        margin: 0 0 12px 0;
      }

      .overline {
        margin-bottom: 2px;
      }
    }
  }
`;

export const BoxSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  background: ${(props) => props.theme.grey.shade9};
  margin-top: 16px;

  .divider {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .text-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${BREAKPOINTS['sm']} {
      justify-content: space-between;
      margin-top: 16px;
      margin-bottom: 0;
    }

    .inner-text {
      width: 150px;
      margin-right: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .left-text {
      width: 150px;
      display: flex;
      margin-right: 16px;
      flex-direction: column;
      align-items: flex-start;
    }

    .right-text {
      display: flex;
      min-width: 150px;
      flex-direction: column;
      flex: 1;
      align-items: flex-end;
    }
  }
`;
