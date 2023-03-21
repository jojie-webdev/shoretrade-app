import TextField from 'components/base/TextField';
import styled from 'utils/styled';

export const Container = styled.div`
  .modal_container {
    .radio__outer_circle {
      height: 16px;
      width: 16px;

      .radio__inner_circle {
        height: 7.25px;
        width: 7.25px;
      }
    }
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
`;

export const GroupedBoxContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  padding: 15px 10px;
  border-radius: 4px;
`;

export const RadioBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
