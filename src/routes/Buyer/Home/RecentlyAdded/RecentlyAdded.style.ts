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
        width: 265px;
      }
    }
  }

  .search-row {
    margin-bottom: 24px;
  }
`;
