import Typography from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

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

export const EstimationsContainer = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: row;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const BadgeText = styled(Typography)`
  font-size: 12px;
  padding-left: 8px;
  padding-right: 8px;
`;
