import Typography from 'components/base/Typography';
import styled from 'utils/styled';

import { ProductDetailsCard1Props } from './ProductDetailsCard1.props';

export const Container = styled.div<ProductDetailsCard1Props>`
  width: 100%;
  background: #ffffff;
  border: 2px solid #edeffa;
  padding: 16px;
  border-width: ${({ cBorderWidth }) => cBorderWidth || '2px'};
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '8px'};
`;

// export const TouchHeart = styled.TouchableOpacity`
//   padding: 4px;
// `;

export const Header = styled.div`
  flex-direction: row;
  display: flex;
`;

export const Title = styled(Typography)`
  margin-bottom: 4px;
`;

export const Row = styled.div`
  flex-direction: row;
  width: 100%;
`;

export const Col = styled.div`
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

export const TagsContainer = styled(Row)`
  margin-bottom: 21px;
`;

export const Size = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade9};
  margin-left: 6px;
  margin-right: 10px;
`;

export const LocationText = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade9};
  margin-left: 6px;
`;
