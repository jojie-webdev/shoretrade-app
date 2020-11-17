import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .checkbox-row {
    margin-bottom: 24px;

    .checkbox-col {
      display: flex;

      .text-container {
        margin-left: 8px;
        margin-top: 16px;

        @media screen and (min-width: 1249px) {
          padding-bottom: 10px;
        }
      }
    }
  }

  .checkbox-alt-label {
    &:hover {
      opacity: 0.5;
    }
    cursor: pointer;
  }

  .add-box-row {
    margin-bottom: 32px;
  }

  .minimum-row {
    .checkbox-col {
      margin-top: 16px;
      display: flex;
      align-items: center;
    }
  }

  .absolute-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
  }

  .box-error-container {
    width: 100%;
    display: flex;
  }
`;

export const BoxDetailsContainer = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  padding: 16px 24px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text-container {
    display: flex;

    .inner-text {
      margin-right: 40px;

      .overline {
        margin-bottom: 2px;
      }
    }
  }

  .cancel-btn {
    border-radius: 100%;
    border: none;
    height: 24px;
    width: 24px;
    background: none;
    margin: 0;
    padding: 0;
  }
`;

export const BoxSummaryContainer = styled.div`
  padding: 25px 80px;
  width: 100%;
  background: ${(props) => props.theme.grey.shade7};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text-container {
    display: flex;

    .inner-text {
      margin-right: 40px;
    }
  }

  @media ${BREAKPOINTS.sm} {
    padding: 16px;

    .text-container {
      flex: 1;
      display: flex;

      .inner-text {
        flex: 1;
        margin-right: 0;

        .value {
          margin-top: 4px;
        }
      }
    }
  }
`;

export const FooterPadding = styled.div`
  height: 35px;
`;
