import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const StyledTextField = styled(TextField)`
  flex: 1;
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0 0 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  padding: 12px 0;
  align-items: flex-start;

  .label {
    margin-left: 8px;
  }
`;

export const ComputationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.6rem;
  margin-bottom: 24px;
  margin-top: 24px;

  .computation-item-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;

    p {
      .indicator {
        font-weight: bold;
      }
    }
  }

  .total-delivery {
    margin-top: 34px;
  }
`;
