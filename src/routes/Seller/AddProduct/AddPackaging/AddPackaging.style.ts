import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .checkbox-alt-label {
    &:hover {
      opacity: 0.5;
    }
    cursor: pointer;
  }

  .back-btn {
    margin-right: 16px;
    max-width: 67px;
  }

  .next-btn {
    max-width: 67px;
  }
`;

export const Choices = styled.div`
  .interactions {
    margin-bottom: 12px;
  }

  .radio-group {
    display: flex;
    margin: 16px 0;

    .radio {
      margin-right: 16px;
    }
  }

  .input-group {
    display: flex;
  }
`;

export const StyledTextField = styled(TextField)`
  width: 105px;

  &:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Aquafuture = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.grey.shade9};
  width: 100%;
  margin-top: 24px;
  margin-bottom: 40px;

  .checkbox-view {
    margin-top: 4px;
  }

  .text-container {
    margin-left: 8px;
  }
`;
