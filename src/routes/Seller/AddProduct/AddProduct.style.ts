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

// Step 3
export const Step3Wrapper = styled.div`
  .interactions {
    margin-bottom: 32px;

    .interaction-container:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .btn-container {
    display: flex;
    justify-content: flex-end;
  }
`;

//Step 4
export const Step4Wrapper = styled.div`
  .select-container {
  }

  .select-row {
    margin-bottom: 12px;
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
