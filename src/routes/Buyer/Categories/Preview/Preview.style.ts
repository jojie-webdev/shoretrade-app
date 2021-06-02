import InteractionsView from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 34px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 16px;
    }

    .left-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }

    .right-header {
      display: flex;
      align-items: center;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }

    .search {
      width: 220px;
      margin-left: 24px;
      margin-bottom: 0;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
        margin-left: 0px;
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

  .preview-col {
    @media (min-width: 577px) and (max-width: 710px) {
      width: 100% !important;
      max-width: 100% !important;
    }

    @media (min-width: 768px) and (max-width: 834px) {
      width: 50% !important;
      max-width: 50% !important;
    }
  }
`;

export const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.grey.shade3};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  height: 32px;

  .btn-text {
    margin-right: 8px;
  }
`;

export const EmptyResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
  }

  img {
    @media ${BREAKPOINTS.xxl} {
      margin-right: 10%;
    }

    @media ${BREAKPOINTS.sm} {
      width: 50%;
      margin-top: 24px;
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
  }

  .right-content {
    padding: 24px 18px 0px 0px;
  }
`;
