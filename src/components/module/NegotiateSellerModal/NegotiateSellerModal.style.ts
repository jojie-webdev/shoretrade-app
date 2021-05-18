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
  padding: 24px 0 0 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  @media ${BREAKPOINTS['sm']} {
    bottom: 0;
    position: absolute;
    margin-bottom: 24px;
    width: 90%;
    .negotiate-btn {
      width: 100%;
      margin: 0 24px;
    }
  }
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  padding: 1rem 0;
  align-items: flex-start;

  .label {
    margin-left: 8px;
  }
`;

export const ComputationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.6rem;
  border-top: 1px solid;
  margin-bottom: 24px;
  margin-top: 24px;
  border-color: ${({ theme }) => theme.grey.shade7};

  .computation-item-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    p {
      .indicator {
        font-weight: bold;
      }
    }
  }
`;
export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseBadge = styled.button`
  height: 32px;
  width: 32px;
  background: ${(props) => props.theme.grey.noshade};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
`;
