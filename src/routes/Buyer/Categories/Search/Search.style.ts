import styled from 'utils/styled';

export const SearchContainer = styled.div`
  padding: 0px 6px;

  .search-row {
    margin-bottom: 24px;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .interactions {
    padding: 0px;
    margin-top: 16px;
  }

  .interactions-right {
    padding: 16px;
    padding-right: 32px;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
`;

export const ItemContainer = styled.div`
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

export const DetailsContainer = styled.div`
  flex-direction: row;
  padding: 8px;
  margin-left: 24px;

  .title {
    font-size: 16px;
  }
`;

export const ResultContainer = styled.div`
  flex: none;
  order: 0;
  align-self: center;
  flex-direction: row;
  display: flex;

  .per {
    margin-left: 3px;
  }

  .result-count {
    margin-left: 10px;
  }

  .measure {
    margin-left: 2px;
  }

  .result-length {
    margin-left: 10px;
  }
`;

export const FilterButton = styled.button`
  background: #111e2b;
  border-radius: 4px;
  color: white;
  float: right;
  margin-top: -8px;
`;
