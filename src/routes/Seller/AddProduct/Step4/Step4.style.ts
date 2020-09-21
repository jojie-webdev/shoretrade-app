import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .metric-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
  }
  .select-row {
    margin-bottom: 12px;
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

    .checkbox-col {
      display: flex;
      align-items: center;

      .text {
        margin-left: 8px;
      }
    }
  }
`;
