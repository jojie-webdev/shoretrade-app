import styled, { css } from 'utils/styled';

const customScrollbar = (props: any) =>
  css`
    ::-webkit-scrollbar {
      width: 0.7rem;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  `;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 0 6px;

  ${customScrollbar}

  .cards {
    display: flex;
    flex-wrap: wrap;
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

export const FilterButton = styled.button`
  background: #111e2b;
  border-radius: 4px;
  color: white;
  margin-top: 4px;
`;
