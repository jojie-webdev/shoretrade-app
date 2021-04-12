import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 48px;

  .re-upload-container {
    background-color: ${({ theme }) => theme.grey.shade9};
    border-radius: 8px;
    padding: 24px;

    .input-container {
      display: flex;

      input {
        display: none;
      }
    }
  }

  .listings-row {
    background-color: ${({ theme }) => theme.grey.shade9};
    border-radius: 8px;
    padding: 24px 24px 8px 24px;
    width: 100%;
    margin: 24px 0;
    overflow-y: scroll;

    .header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid ${({ theme }) => theme.grey.shade8};
      padding-bottom: 7px;
      margin-bottom: 9px;

      p {
        flex: 1;
        margin: 0 6px;

        @media ${BREAKPOINTS['sm']} {
          min-width: 80px;
        }
      }
    }

    .listings-data-row {
      display: flex;
      align-items: center;
      margin-bottom: 16px;

      .column-item {
        flex: 1;
        margin: 0 6px;

        @media ${BREAKPOINTS['sm']} {
          min-width: 80px;
        }
      }

      img {
        height: 40px;
        width: 40px;
        border-radius: 8px;
      }
    }
  }

  .btns-row {
    display: flex;
    margin-top: 32px;

    button {
      margin-right: 12px;
      margin-bottom: 12px;
    }
  }
`;

export const ErrorButton = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
