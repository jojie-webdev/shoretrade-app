import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
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
        width: 350px;
        margin: 4px 0;

        @media ${BREAKPOINTS['sm']} {
          width: 100%;
        }

        .badge {
          margin: 0 4px 4px 0;
        }
      }

      .weights {
        display: flex;
        align-items: center;

        svg {
          margin: 0 6px;
        }
      }
    }

    .right-component {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        cursor: pointer;
        margin-left: 28px;
        width: 20px;
        height: 20px;
      }
    }
  }

  .checkbox-container {
    display: flex;
    padding: 1rem 0;

    .label {
      margin-left: 8px;
    }
  }
`;
