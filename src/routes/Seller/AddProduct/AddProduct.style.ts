import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 80px;
`;

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

// Step 5
export const Step5Wrapper = styled.div`
  .preview-row {
    margin-bottom: 16px;

    .add-col {
      margin-bottom: 48px;

      .text {
        margin-bottom: 4px;
      }
    }

    .preview-col {
      display: flex;
      align-items: center;

      .img-preview {
        height: 96px;
        width: 96px;
        border: 1px solid red;
        margin-right: 8px;
        border-radius: 4px;
      }
    }
  }
`;

export const DeleteBadge = styled.button`
  padding: 4px 8px;
  background: ${(props) => props.theme.brand.error};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;

  :focus {
    outline: none;
  }

  .badge-text {
    margin-left: 4px;
  }
`;

// Step 6
export const Step6Wrapper = styled.div`
  .checkbox-row {
    margin-bottom: 24px;

    .checkbox-col {
      display: flex;

      .text-container {
        margin-left: 8px;
        margin-top: 16px;
      }
    }
  }

  .add-box-row {
    margin-bottom: 32px;
  }

  .minimum-row {
    margin-bottom: 40px;

    .checkbox-col {
      margin-top: 16px;
      display: flex;
      align-items: center;

      .text {
        margin-left: 8px;
      }
    }
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
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 80px;
  width: 100%;
  background: ${(props) => props.theme.grey.shade7};

  .text-container {
    display: flex;

    .inner-text {
      margin-right: 40px;
    }
  }
`;

// Step 7

export const Step7Wrapper = styled.div`
  .textfield-col {
    margin-bottom: 36px;
  }
`;
