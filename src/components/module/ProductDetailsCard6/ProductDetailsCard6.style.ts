import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography';
import { Theme } from 'types/Theme';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';

export const Container = styled.div<ProductDetailsCard6Props>`
  width: 100%;

  box-shadow: ${({ theme, withBackground }) =>
    withBackground ? '0 4px 12px rgba(41,43,50,0.04)' : ''};

  padding: ${({ theme, withBackground }) =>
    withBackground ? '24px' : '16px 0'};
  border-width: ${({ cBorderWidth }) => cBorderWidth || '2px'};
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '8px'};

  background-color: ${({ theme, withBackground }) =>
    withBackground ? `${theme.grey.noshade}` : 'rgba(0,0,0,0)'};

  .label-container {
    display: flex;
    align-items: center;
    > p {
      margin: 0;
    }
  }

  .tooltip-container {
    margin: 0;

    .tooltip-content-container {
      width: 250px;
    }

    .icon-label-wrapper {
      :hover {
        cursor: default;
      }
    }

    .__react_component_tooltip.show {
      opacity: 100%;
    }

    .table-header-col,
    .table-col {
      padding: 8px !important;
      display: flex;
    }

    .table-col:not(:first-of-type) {
      background: ${({ theme }) => theme.grey.shade9};
    }

    .table-header-col:not(:last-of-type),
    .table-col:not(:last-of-type) {
      border-right: 1px solid ${({ theme }) => theme.grey.shade8};
    }

    .table-header-row,
    .table-row:not(:last-of-type) {
      border-bottom: 1px solid ${({ theme }) => theme.grey.shade8};
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Price = styled(Typography)`
  margin-bottom: 8px;
`;

export const Label = styled(Typography)`
  margin-bottom: 8px;
`;

export const NegotiatePriceBtnWrapper = styled.div<{
  backgroundColor?: keyof Theme['grey'];
}>`
  padding: 0px 6px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? theme['grey'][backgroundColor] : theme.brand.primary};
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

export const NegotiatePriceBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  height: fit-content;
`;

export const NegotiatePriceText = styled(TypographyView)`
  font-size: ${pxToRem(14)};
  margin: 0;
`;
