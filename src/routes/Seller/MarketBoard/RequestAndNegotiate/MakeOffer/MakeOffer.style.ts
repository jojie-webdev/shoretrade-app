import styled from 'utils/styled';

export const Container = styled.div`
  .row-label {
    margin-top: 16px;
    margin-bottom: 8px;
  }

  .interactions {
    margin-bottom: 8px;
  }

  .checkbox-container {
    display: flex;
    padding: 1rem 0;

    .label {
      margin-left: 8px;
    }
  }

  .textfield-col {
    margin-bottom: 8px;
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
