import styled from 'utils/styled';

export const SearchContainer = styled.div`
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
    padding: 10px;
  }

  .result-container {
    flex: none;
    order: 0;
    align-self: center;
    flex-direction: row;
    display: flex;
  }
`;

export const Image = styled.img`
  width: 100px;
  height: 100px;
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
`;
