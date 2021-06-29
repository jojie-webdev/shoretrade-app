import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

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

  .back-btn {
    margin-right: 16px;
    max-width: 67px;
  }

  .next-btn {
    max-width: 67px;
  }
`;
