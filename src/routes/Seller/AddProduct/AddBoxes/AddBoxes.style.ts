import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 200px;
  }

  .minimum-row {
    margin: 40px 0;

    .checkbox-col {
      margin-top: 16px;
      display: flex;
      align-items: center;
    }
  }

  .box-error-container {
    width: 100%;
    margin-top: 24px;
  }

  .back-btn {
    margin-right: 16px;
    max-width: 67px;
  }

  .next-btn {
    max-width: 67px;
  }

  .tooltip {
    margin-left: 8px;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    width: 192px;
    background-color: black;
    color: ${({ theme }) => theme.grey.noshade};
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    margin-top: 30px;
    margin-left: -120px;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
  }

  .mobile-footer {
    flex-direction: column;

    .mobile-footer-buttons {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const AddBoxRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
  background-color: ${({ theme }) => theme.grey.shade9};
  border-radius: 8px;
  padding: 16px 24px;

  .add-box-col {
    flex: 1;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  .qty-col {
    @media ${BREAKPOINTS['sm']} {
      flex: 0.5;
    }
  }

  .add-box-button {
    width: 88px;
    margin-left: 8px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 0;
    margin-bottom: 16px;
  }
`;

export const BoxSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.grey.shade9};
  border-radius: 8px;
  padding: 16px 24px;
  width: 100%;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 24px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 8px;

    .overline {
      margin-bottom: 4px;
    }
  }
`;

export const BoxDetailsContainer = styled.div`
  padding: 12px 24px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade9};

  .texts {
    display: flex;
    align-items: center;
    flex: 1;

    .text-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 8px;

      .overline {
        margin-bottom: 4px;
      }
    }
  }

  .minus {
    position: absolute;
    top: 12px;
    right: 24px;

    @media ${BREAKPOINTS['sm']} {
      right: 0;
    }
  }
`;

export const Aquafuture = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.grey.shade9};
  width: 100%;
  margin-bottom: 40px;

  .checkbox-view {
    margin-top: 4px;
  }

  .text-container {
    margin-left: 8px;
  }
`;
