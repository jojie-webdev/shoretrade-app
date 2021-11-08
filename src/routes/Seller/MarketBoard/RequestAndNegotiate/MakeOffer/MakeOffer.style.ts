import Typography from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import summaryImage from 'res/images/seller-market-board-card.png';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  padding-bottom: 180px;

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 140px;
  }

  .shipping-to {
    display: flex;
    align-items: center;
    margin-top: 8px;

    p:first-child {
      margin-right: 4px;
    }
  }

  .row-label {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .interactions {
    margin-bottom: 8px;
  }

  .checkbox-container {
    display: flex;

    .label {
      margin-left: 8px;
    }
  }

  .textfield-row {
    margin-top: 24px;
  }

  .textfield-col {
    margin-bottom: 16px;
    margin-top: 16px;
    .textfield {
      p:first-child && > p {
        position: absolute;
        bottom: 44px;

        @media ${BREAKPOINTS['sm']} {
          bottom: 44px;
        }
        @media ${BREAKPOINTS['md']} {
          bottom: 44px;
        }
      }
    }
  }

  .total-container {
    height: 96px;
    width: 100%;
    background-color: ${({ theme }) => theme.grey.shade9};
    border-radius: 12px;
    padding: 16px;
  }

  .submit-btns-step2 {
    display: flex;
  }

  .submit-btn-step2 {
    margin-top: 1rem;
    margin-right: 8px;
    max-width: 148px;
  }
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;

export const MetricContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 16px;
`;

export const SummaryCard = styled.div`
  padding: 24px;
  width: 100%;
  min-height: 320px;
  background-image: url(${summaryImage});
  background-size: cover;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.grey.shade9};

  .summary {
    font-family: 'Wilderness', serif;
    font-size: ${pxToRem(32)};
  }

  .summary-border {
    margin-top: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.grey.noshade};
    mix-blend-mode: soft-light;
    border-radius: 2px;
  }

  .header {
    font-family: 'Wilderness', serif;
    margin-top: 12px;
  }

  .value {
    display: flex;
    align-items: center;
    margin-left: 2px;
  }

  .values {
    font-family: 'Wilderness', serif;
    font-size: ${pxToRem(38)};
    margin-left: 6px;
  }
`;

export const MobileFromToTextFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
