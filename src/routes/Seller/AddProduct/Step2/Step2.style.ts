import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

// Step 3
export const Container = styled.div`
  .interaction-group {
    margin-bottom: 40px;

    .interaction-container:not(:last-child) {
      margin-bottom: 8px;
    }

    @media ${BREAKPOINTS['sm']} {
      .interactions {
        max-height: 40px;
      }
    }
  }

  .btn-container {
    display: flex;
    justify-content: flex-start;

    .back-btn {
      margin-right: 16px;
      max-width: 67px;
    }
    .next-btn {
      max-width: 67px;
    }
  }
`;
