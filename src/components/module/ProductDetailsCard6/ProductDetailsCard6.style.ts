import Typography from 'components/base/Typography';
import styled from 'utils/styled';

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
