import Alert from 'components/base/Alert';
import InteractionsView from 'components/base/Interactions';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  .row {
    height: 100%;
  }

  .search-row {
    margin-bottom: 24px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
  width: 100%;
`;

export const ItemCard = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 90%;

    :hover {
      cursor: pointer;
    }
    @media ${BREAKPOINTS['iPad']} {
      align-items: unset;
      flex-direction: column;
    }
  }

  .left-content {
    display: flex;
    align-items: center;
    flex: 1;

    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .tags-container {
      display: flex;
      margin: 2px 0;
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    flex: 1;

    .item-data {
      display: flex;
      align-items: center;
      flex: 1;

      @media ${BREAKPOINTS['iPad']} {
        margin-left: 42px;
      }

      @media ${BREAKPOINTS['genericTablet']} {
        margin-left: 40px;
      }

      .column-order {
        flex-direction: column;
      }

      .bottom-space {
        margin-bottom: 20px;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0.3;
    z-index: 1000;
  }

  @media (max-width: 1383px) {
    .right-content {
      margin-top: 8px;
      margin-left: 72px;
      flex-wrap: wrap;
    }

    .buttons {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }

  @media (max-width: 500px) {
    .right-content {
      margin-left: 0px;
    }
  }

  @media (max-width: 460px) {
    .right-content {
      .item-data {
        flex-wrap: wrap;
      }
    }
  }
`;

export const StyledTouchable = styled(Touchable)`
  margin-right: 6px;
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade8};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const ItemImage = styled.img`
  width: 92px;
  height: 92px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};

  margin-right: 16px;
  border-radius: 4px;
`;

export const ItemDetail = styled(Typography)<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  align-items: ${(props) => (props.row ? 'center' : 'flex-start')};

  width: auto;
  white-space: nowrap;
  line-height: 16px;

  margin-right: 56px;

  @media (max-width: 1052px) {
    margin-right: 32px;
  }

  @media (max-width: 980px) {
    margin-right: 16px;
  }

  @media (max-width: 550px) {
    flex: 1;
  }

  span {
    color: ${(props) => props.theme.grey.noshade};
    font-size: 14px;
    margin-left: ${(props) => (props.row ? '8px' : '0')};
    line-height: 24px;
  }
`;

export const NoSellingContainer = styled.div<{ fluid?: boolean }>`
  display: flex;
  flex-direction: row;
  height: ${({ fluid }) => (fluid ? 'auto' : '100%')};
  width: 100%;

  @media ${BREAKPOINTS['sm']} {
    flex-direction: column;
  }
  @media ${BREAKPOINTS['xl']} {
    flex-direction: column;
  }

  .parent-details {
    .title-text {
      margin-bottom: 40px;
    }
    .add-product-btn {
      width: 308px;
      margin-top: 40px;
    }

    .details-container {
      display: flex;
      flex-direction: row;

      .details-column-container {
        font-size: ${pxToRem(14)};
        display: flex;
        flex-direction: row;
        margin-top: 16px;

        .circle {
          width: 12px;
          height: 12px;
          background-color: ${(props) => props.theme.brand.success};
          border-radius: 50%;
          box-shadow: 0 0 0 8px rgba(0, 196, 140, 0.1);
          margin-right: 24px;
        }

        .text-container {
          margin-top: -8px;
          flex-direction: column;
          max-width: 360px;
        }
      }
    }
  }
`;

export const ItemCardMobile = styled.div`
  background: ${(props) => props.theme.grey.shade9};

  border-radius: 4px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    :hover {
      cursor: pointer;
    }
  }

  .parent-container {
    width: 100%;
    padding: 12px;
  }

  .product-container {
    display: flex;
    flex-direction: row;

    .price-container {
      display: flex;
      flex-direction: column;
      width: 64px;
      position: absolute;
      right: 3%;
    }
  }

  .tags-container {
    display: flex;
    flex-direction: row;
    margin: 8px 0;
  }

  .details-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    .details-column-container {
      font-size: ${pxToRem(12)};
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      padding-right: 8px;
      flex: 1 0 auto;

      .circle {
        width: 12px;
        height: 12px;
        background-color: ${(props) => props.theme.brand.success};
        border-radius: 50%;
        box-shadow: 0 0 0 8px rgba(0, 196, 140, 0.1);
        margin-right: 24px;
      }

      .label-container {
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        width: 100%;

        .right-text,
        .left-text {
          font-size: ${pxToRem(12)};
          letter-spacing: -0.6px;
        }
      }
    }
  }
`;

export const ItemImageMobile = styled.img`
  width: 40px;
  max-height: 40px;
  margin-right: 8px;
  object-fit: cover;
  border-radius: 4px;
  background: ${(props) => props.theme.grey.noshade};
`;

export const ItemDetailMobile = styled(Typography)<{ row?: boolean }>`
  font-size: ${pxToRem(14)};
  white-space: nowrap;
  line-height: 16px;
  margin-bottom: 0.6rem;
`;

export const SVGContainer = styled.div<{
  circleColor: string;
  circleHeight?: number;
  circleWidth?: number;
}>`
  margin-top: 0px;
  margin-bottom: 0px;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 200px;

  @media ${BREAKPOINTS['xl']} {
    margin-left: -40px !important;
  }

  @media ${BREAKPOINTS['iPad']} {
    margin-left: 80px;
  }

  svg {
    z-index: 2;
  }
  @media ${BREAKPOINTS['sm']} {
    margin-top: -12px;
  }

  :before {
    position: absolute;
    content: '';
    height: ${(props) =>
      props.circleHeight ? `${props.circleHeight}px` : '210px'};
    width: ${(props) =>
      props.circleWidth ? `${props.circleWidth}px` : '210px'};
    border-radius: 210px;
    z-index: 1;

    background: ${(props) =>
      props.circleColor !== '' ? props.circleColor : props.theme.grey.shade9};
  }
`;

export const StyledInteraction = styled(InteractionsView)`
  padding: 0;
  margin-bottom: 16px;

  align-items: flex-start;

  .left-content {
    flex: 1 0 auto;
    max-width: 90%;
    padding-right: 0px;
  }

  .right-content {
    padding: 24px 18px 0px 0px;
  }
`;
