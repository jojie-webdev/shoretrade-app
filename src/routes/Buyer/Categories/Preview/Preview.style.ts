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
  display: table;
  clear: both;
  width: 100%;
  padding: 0 6px;

  ${customScrollbar}

  .cards {
    display: flex;
    flex-wrap: wrap;
    clear: both;
  }

  .search-container {
    flex-direction: row;
    display: flex;
  }

  .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
  }

  /* Float four columns side by side */
  .column {
    float: left;
    /* width: 30%; */
    padding: 0;
  }

  /* Remove extra left and right margins, due to padding */
  .row {
    margin: 0 -5px;
  }

  /* Clear floats after the columns */
  .row:after {
    content: '';
    display: table;
    clear: both;
  }

  /* Responsive columns */
  @media screen and (max-width: 600px) {
    .column {
      width: 100%;
      display: block;
      margin-bottom: 20px;
    }
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
  width: 69px;
  min-width: 69px !important;
  align-content: 'center';
  justify-content: 'center';
`;
