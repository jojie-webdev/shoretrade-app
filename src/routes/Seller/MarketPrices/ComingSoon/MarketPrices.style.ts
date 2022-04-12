import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const MarketContainer = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .search-row {
    margin-bottom: 24px;
  }

  .items-row {
    .market-item {
      display: block;
      margin-bottom: 8px;
    }
  }
`;

export const MarketItemContainer = styled.div`
  height: 72px;
  background: ${(props) => props.theme.grey.shade9};
  padding: 24px;
`;

export const SpinnerContainer = styled.div`
  margin-top: 15px;
`;
