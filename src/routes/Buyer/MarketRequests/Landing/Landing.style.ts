import styled, { css } from 'utils/styled';

export const MarketRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 16px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;
