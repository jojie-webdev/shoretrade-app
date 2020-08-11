import styled from 'utils/styled';

export const Container = styled.div``;

// Step 1
export const Step1Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  .btn-container {
    margin-top: 20px;
  }
`;

// Step 2
export const Step2Wrapper = styled.div`
  .search-row {
    margin-bottom: 32px;
  }

  .results-row {
    .title {
      margin-bottom: 16px;
    }

    .item-container {
      margin-bottom: 8px;
    }
  }
`;
