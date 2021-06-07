import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .textfield-row {
    margin-bottom: 8px;

    .textfield-col {
      margin-bottom: 36px;
      > div > div {
        border-radius: 8px;
      }
      > div > div > div {
        border-radius: 8px;
      }
    }
    .text-area {
      > div > textarea {
        border-radius: 8px;
      }
      > div {
        width: 50%;
        padding-right: 16px;
        @media ${BREAKPOINTS['sm']} {
          width: 100%;
          padding-right: 0px;
        }
        @media ${BREAKPOINTS['iPad']} {
          width: 100%;
          padding-right: 0px;
        }
      }
    }
  }
  .back-btn {
    margin-right: 16px;
    max-width: 67px;
  }
  .next-btn {
    max-width: 67px;
  }
`;
