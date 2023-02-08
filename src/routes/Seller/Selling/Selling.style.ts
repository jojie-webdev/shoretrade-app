import Alert from 'components/base/Alert';
import Touchable from 'components/base/Touchable';
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
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 12px;
  width: 100%;
`;

export const StyledTouchable = styled(Touchable)`
  margin-right: 6px;
`;

export const Tag = styled.div<{
  background?: string;
}>`
  background: ${({ background, theme }) =>
    background ? background : theme.grey.shade8};
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};
  border-radius: 8px;

  @media ${BREAKPOINTS['sm']} {
    width: 40px;
    height: 40px;
  }
`;

export const NoSellingContainer = styled.div<{ fluid?: boolean }>`
  display: flex;
  flex-direction: row;
  height: ${({ fluid }) => (fluid ? 'auto' : '100%')};
  width: 100%;

  .parent-details {
    .title-text {
      margin-bottom: 24px;
    }
    .add-product-btn {
      width: 150px;
      margin-top: 24px;
    }

    .details-container {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;

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

  @media ${BREAKPOINTS['sm']} {
    flex-direction: column;

    .add-product-btn {
      width: 100% !important;
      margin-top: 60px !important;
    }
  }
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

  @media ${BREAKPOINTS['sm']} {
    margin: 30px 0;
  }

  @media ${BREAKPOINTS['genericTablet']} {
    margin-left: 80px;
  }

  @media ${BREAKPOINTS['xl']} {
    margin-right: -30px;
    margin-left: -20px;
  }

  svg {
    z-index: 2;
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

export const TabItem = styled.div`
  display: flex;

  .tab-label {
    margin-right: 6px;
  }
`;

export const ProductPreviewContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: 16,
  marginBottom: 20,
});

export const MarketBoardIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.brand.primary};
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border-radius: 25px !important;
  margin-left: 10px;
  margin-top: -6px;
`;
