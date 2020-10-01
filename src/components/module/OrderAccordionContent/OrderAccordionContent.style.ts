import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ActionText = styled(Typography)`
  margin-left: 6px;
`;

export const Container = styled.div`
  padding: 0px 16px 16px 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-radius: 4px;
  // box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
`;

export const HorizontalRule = styled.div`
  width: 327px;
  height: 2px;
  left: 384px;
  top: 304px;
  background-color: ${({ theme }) => theme.grey.shade2};
  margin-left: -16px;
`;

export const ValuesColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  margin-right: 56px;
  min-width: 120px;
  margin: 4px 0;
  font-size: 16px;
`;

export const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 56px;
  min-width: 120px;
  margin: 6px 0;
`;

export const OrderValue = styled(Typography)`
  margin: 2px 0px
  font-size: 11px
`;

export const SeafoodName = styled(Typography)`
  max-width: 195px;
  max-height: 48px;
  margin-bottom: 9px;
`;

export const OrderNumber = styled(Typography)`
  color: ${({ theme }) => theme.brand.primary};
  font-weight: bold;
  margin-left: 6px;
  font-size: 11px;
`;

export const Preview = styled.img`
  width: 100px;
  height: 100px;
  margin: 16px 16px 16px 0px;
  border-radius: 4px;
`;

export const Details = styled.div`
  margin: 16px 0px;
`;

export const TagsContainer = styled(Row)`
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const Tag = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2px 8px;
  background: ${({ theme }) => theme.grey.shade2};
  align-items: center;
  min-height: 16px;
  border-radius: 2px;
  margin-right: 4px;
`;

export const TagText = styled(Typography)``;

export const Right = styled(Typography)`
  margin-left: 4px;
`;

export const Total = styled(Typography)`
  margin-left: 10px;
`;

export const ShippingCost = styled(Typography)`
  margin-left: 19px;
`;

export const Shipping = styled(Typography)`
  margin-top: 12px;
`;

export const ShippingContainer = styled(Typography)`
  display: flex;
  align-items: center;
  margin-right: 56px;
  min-width: 120px;
  margin: 16px 0 0 0;
  font-size: 16px;
`;
