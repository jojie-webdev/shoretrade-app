import Typography from 'components/base/Typography';
import styled from 'utils/styled';

import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';

export const Container = styled.div<ProductDetailsCard6Props>`
  width: 100%;
  background: #ffffff;
  border: 2px solid #edeffa;
  padding: 16px;
  border-width: ${({ cBorderWidth }) => cBorderWidth || '2px'};
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '8px'};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Price = styled(Typography)`
  margin-bottom: 8px;
`;

export const Label = styled(Typography)`
  margin-bottom: 8px;
`;

export const Value = styled(Typography)``;
