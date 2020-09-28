import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

// Step 3
export const Container = styled.div`
  .interaction-group {
    margin-bottom: 32px;

    .interaction-container:not(:last-child) {
      margin-bottom: 8px;
    }

    /* @media ${BREAKPOINTS['sm']} {
      margin-bottom: 8px;
    } */
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
`;
