import styled from 'utils/styled';

export const Container = styled.div`
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
  /* bottom: 0; */
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
