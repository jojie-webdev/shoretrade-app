import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .interactions {
    margin-bottom: 8px;
  }
`;

export const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 38px;

  @media ${BREAKPOINTS.sm} {
    margin-bottom: 24px;
  }
`;

export const ListingCounter = styled.span`
  font-weight: 900;
  color: ${({ theme }) => theme.grey.shade9};
  margin-right: 4px;
`;

export const ListingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .search-container {
      margin-top: 8px;
      width: 100%;
    }
  }
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
`;
