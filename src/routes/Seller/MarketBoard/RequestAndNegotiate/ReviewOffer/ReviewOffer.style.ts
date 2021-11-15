import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 140px;
  }

  .interactions {
    margin-bottom: 12px;

    .left-component {
      display: flex;
      align-items: center;

      img {
        width: 92px;
        height: 92px;
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

          @media ${BREAKPOINTS['sm']} {
            width: fit-content;
          }
        }
      }

      .weights {
        display: flex;
        align-items: center;
      }
    }

    .right-component {
      display: flex;
      justify-content: center;
      align-items: center;

      @media ${BREAKPOINTS['sm']} {
        flex-direction: column;
      }

      svg {
        cursor: pointer;
        margin-left: 28px;
        width: 20px;
        height: 20px;

        @media ${BREAKPOINTS['sm']} {
          margin-left: 0;
        }
      }

      svg:last-child {
        @media ${BREAKPOINTS['sm']} {
          margin-top: 16px;
        }
      }
    }
  }

  .checkbox-container {
    display: flex;
    padding: 1rem 0;

    .label {
      margin-left: 8px;
    }
  }
`;

export const ItemDetail = styled(Typography)<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  align-items: ${(props) => (props.row ? 'center' : 'flex-start')};
  margin-left: -6px;
  width: auto;
  white-space: nowrap;
  line-height: 16px;

  margin-right: 56px;

  @media (max-width: 1052px) {
    margin-right: 32px;
  }

  @media (max-width: 980px) {
    margin-right: 16px;
  }

  @media (max-width: 550px) {
    flex: 1;
  }

  span {
    color: ${(props) => props.theme.grey.noshade};
    font-size: 14px;
    margin-left: ${(props) => (props.row ? '8px' : '0')};
    line-height: 24px;
  }
`;

export const BadgeText = styled(Typography)`
  font-size: ${pxToRem(12)};
`;

export const ThirdSpecsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ThirdItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  .sup-text-2 {
    color: ${({ theme }) => theme.grey.shade6};
    font-weight: normal;
    font-size: 23px;
    margin-right: 5px;
  }
`;
