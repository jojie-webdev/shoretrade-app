import Interactions from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
export const Container = styled.div``;

export const MarketRequestItemMobileContainer = styled.div`
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

export const MarketRequestItemInteraction = styled(Interactions)`
  justify-content: initial;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px;
  ${({ theme }) => {
    return theme.isSFM && `border: 2px solid ${theme.brand.secondary};`;
  }}

  @media ${BREAKPOINTS['sm']} {
    padding: 12px;
  }

  padding-right: 12px;
  align-items: center;

  .left-content {
    flex-grow: 2;
  }

  .cta {
    display: flex;
    align-items: center;
    height: 140px;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between;
  }
`;
