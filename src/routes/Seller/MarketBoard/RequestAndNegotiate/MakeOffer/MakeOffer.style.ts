import Typography from 'components/base/Typography/Typography.view';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 180px;

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
  }

  .total-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    margin-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.grey.shade7};
  }
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
