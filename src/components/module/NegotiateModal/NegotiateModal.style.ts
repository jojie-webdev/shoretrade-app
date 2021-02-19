import TextField from 'components/base/TextField';
import styled from 'utils/styled';

export const StyledTextField = styled(TextField)`
  flex: 1;
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 0 0 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: flex-start;

  .label {
    margin-left: 4px;
  }
`;

export const ComputationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.6rem;
  border-top: 1px solid;
  margin-bottom: 1rem;
  border-color: ${(props) => props.theme.grey.shade3};
  .computation-item-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      .indicator {
        font-weight: bold;
      }
    }

    .value {
      font-size: 14px;
    }
  }
`;
