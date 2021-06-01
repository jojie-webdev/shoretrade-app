import Typography from 'components/base/Typography';
import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) =>
      props.isIOS ? `calc(${IOSBOTTOMPADDING} + 24px)` : '24px'};

    .search-row {
      display: flex;
      flex-direction: row;
      .filter-search {
        width: 70%;
        margin-right: 16px;
      }
      .mobile-filter {
        width: 25%;
      }
    }
  }

  .interactions {
    margin-bottom: 12px;
    padding: 16px 12px;

    .left-component {
      display: flex;
      align-items: flex-start;

      img {
        width: 66px;
        height: 66px;
        border-radius: 8px;
        margin-right: 16px;
      }

      .badges-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 350px;
        margin: 4px 0;

        @media ${BREAKPOINTS['sm']} {
          width: 100%;
          flex-direction: row;
        }

        .badge {
          margin: 0 4px 4px 0;
          display: flex;
          flex-direction: row;
          @media ${BREAKPOINTS['sm']} {
            width: fit-content;
          }
          .svg-container {
            margin-left: 5px;
            margin-top: -2px;
          }
        }
      }

      .expiry {
        font-style: italic;
      }

      .weights {
        display: flex;
        align-items: center;
      }

      .shipping-to {
        margin-top: 8px;
        display: flex;
        align-items: center;

        p:first-child {
          margin-right: 4px;
        }
      }
    }
  }

  .title-board {
    margin-bottom: 16px;
  }

  .filter-ipad-container {
    display: flex;
    margin-top: -24px;
    width: 100%;
    align-content: flex-end;
    justify-content: flex-end;
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
