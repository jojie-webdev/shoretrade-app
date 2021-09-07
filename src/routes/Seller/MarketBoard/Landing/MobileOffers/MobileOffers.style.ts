import Badge from 'components/base/Badge';
import styled from 'utils/styled';

export const BuyerRequestMobileContainer = styled.div`
  .thumbnail-container {
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
`;

export const MajorInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MinorInfo = styled.div`
  margin-top: 8px;
`;

export const SubMinorInfo = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SubMinorDetail = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const Badges = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const StyledStatusBadge = styled(Badge)`
  display: flex;
  align-items: center;
  height: 22px;
  border-radius: 8px;
`;
