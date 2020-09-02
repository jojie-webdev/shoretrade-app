import styled from 'utils/styled';

export const SearchContainer = styled.div`
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

export const CSearchItemContainer = styled.div`
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

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;
