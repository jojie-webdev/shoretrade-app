import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .size-container {
    background-color: ${({ theme }) => theme.grey.shade9};
    padding: 24px;
    border-radius: 8px;

    .metric-row {
      display: flex;
      flex-direction: row;
      margin-bottom: 16px;
    }

    .select-row {
      margin-bottom: 12px;

      & > div:not(:last-child) {
        margin-bottom: 16px;
      }
    }

    @media ${BREAKPOINTS['sm']} {
      background-color: unset;
      padding: unset;
      border-radius: unset;
    }
  }

  .select-col {
    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 24px;
    }
  }

  .or-row {
    margin: 36px 0;

    .or-col {
      display: flex;
      align-items: center;

      .line {
        border: 1px solid ${(props) => props.theme.grey.shade7};
        flex: 1;

        &.left {
          margin-right: 8px;
        }

        &.right {
          margin-left: 8px;
        }
      }
    }
  }

  .checkbox-row {
    margin-bottom: 48px;
  }
  .back-btn {
    margin-right: 16px;
    border-radius: 8px;
    max-width: 67px;
  }
  .next-btn {
    border-radius: 8px;
    max-width: 67px;
  }
`;
