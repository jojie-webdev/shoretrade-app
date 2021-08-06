import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .tabs-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 16px;
    }

    .tabs {
      width: 330px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
        margin-bottom: 16px;
      }
    }

    .search {
      width: 280px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }
  }

  .interactions {
    margin-bottom: 8px;

    .left-content {
      display: flex;
      align-items: center;
      width: 100%;

      .section {
        flex: 1;
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        margin-right: 12px;
      }

      .badge {
        display: flex;
        width: fit-content;

        .svg-container {
          margin-left: 5px;
          margin-top: -2px;
        }
      }
    }
  }
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  height: 40px;
  margin-bottom: 16px;

  .btn-text {
    margin-right: 8px;
  }
`;

export const BadgeText = styled(Typography)`
  font-size: ${pxToRem(12)};
`;
