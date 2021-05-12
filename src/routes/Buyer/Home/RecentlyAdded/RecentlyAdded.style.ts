import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 34px;

    .header-title {
      margin-bottom: 24px;
    }

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
      width: 240px;
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

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
