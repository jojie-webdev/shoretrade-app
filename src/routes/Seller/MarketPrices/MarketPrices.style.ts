import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const MarketContainer = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) => (props.isIOS ? IOSBOTTOMPADDING : 0)};
  }

  .title-row {
    margin-bottom: 24px;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
