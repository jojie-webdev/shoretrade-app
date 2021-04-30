import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 0 8px 8px 8px;

  .cards {
    display: flex;
    flex-wrap: wrap;

    a {
      margin-right: 32px;

      .card {
        width: 281px;
      }
    }
  }

  .search-row {
    margin-bottom: 24px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;
