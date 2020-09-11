import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  padding: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-radius: 4px;6
  margin-bottom: 2px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12)
`;

export const Value = styled.div`
  display: flex;
  align-items: center;
  margin-right: 56px;
  min-width: 120px;
  margin: 2px 0;
  font-size: 16px;
`;

export const VendorLocation = styled(Row)`
  margin-bottom: 16px;
`;

export const SeafoodDetails = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  margin-top: 16px;
`;

export const SeafoodName = styled(Typography)`
  max-width: 195px;
  max-height: 48px;
  font-size: 16px;
  margin-bottom: 11px;
`;

export const Preview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-right: 16px;
  border-radius: 4px;
`;

export const Details = styled.div``;

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
  margin-right: 4px;
`;

export const HorizontalRule = styled.div`
  width: 327px;
  height: 2px;
  left: 384px;
  top: 304px;
  background-color: ${({ theme }) => theme.grey.shade2};
  margin-left: -16px;
`;
