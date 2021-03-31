import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .search-row {
    margin-top: 24px;
  }

  .interactions {
    margin-bottom: 12px;

    .left-component {
      display: flex;
      align-items: center;

      img {
        width: 92px;
        height: 92px;
        border-radius: 8px;
        margin-right: 16px;
      }

      .badges-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 350px;
        margin: 4px 0;

        @media ${BREAKPOINTS['sm']} {
          width: 100%;
          flex-direction: column;
        }

        .badge {
          margin: 0 4px 4px 0;

          @media ${BREAKPOINTS['sm']} {
            width: fit-content;
          }
        }
      }

      .expiry {
        font-style: italic;
      }

      .weights {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  height: 40px;
  margin-bottom: 16px;

  .btn-text {
    margin-right: 4px;
  }
`;