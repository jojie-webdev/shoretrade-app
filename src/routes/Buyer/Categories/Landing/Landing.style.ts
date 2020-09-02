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

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;

  ${customScrollbar}

  .cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .search-row {
    margin-bottom: 24px;
  }
`;
