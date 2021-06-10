import InteractionsView from 'components/base/Interactions/Interactions.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 34px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 16px;
      align-items: flex-start;
      flex-direction: column;
    }

    .right-header {
      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }

    .search {
      width: 280px;
      margin-bottom: 0;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }
  }

  .category-preview-card {
    @media ${BREAKPOINTS['sm']} {
      width: 100%;

      .card,
      .img {
        width: 100%;
      }

      .img {
        height: 180px;
      }
    }
  }
`;

export const StyledInteraction = styled(InteractionsView)`
  padding: 0;
  margin-bottom: 16px;
  align-items: flex-start;

  .left-content {
    flex: 1 0 auto;
    max-width: 90%;
    padding-right: 0px;
  }

  .right-content {
    padding: 24px 18px 0px 0px;
  }
`;
