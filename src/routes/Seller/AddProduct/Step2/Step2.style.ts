import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

// Step 2
export const Container = styled.div`
  .search-row {
    margin-bottom: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 8px;
    }
  }

  .results-row {
    .title {
      margin-bottom: 16px;
    }

    .item-container {
      margin-bottom: 8px;
    }
  }
`;
