import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .interaction-col {
    margin-bottom: 16px;

    @media ${BREAKPOINTS.sm} {
      .interactions {
        height: 48px;
      }
    }

    .text-area {
      @media ${BREAKPOINTS.sm} {
        .interactions {
          height: 100% !important;
        }
      }
    }
  }
`;

export const ButtonRow = styled(Row)`
  .button {
    max-width: 200px;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;
