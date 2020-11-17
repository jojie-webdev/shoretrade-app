import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  display: table;
  clear: both;
  width: 100%;
  padding: 0 6px;
`;

export const SellerRatingContainer = styled.div`
  margin-bottom: 44px;
`;

export const SpinnerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ListingCounter = styled.span`
  font-weight: 900;
  margin-left: 10px;
`;

export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    justify-content: flex-start;

    .search-container {
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
`;
