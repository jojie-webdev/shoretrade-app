import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .interaction-col {
    margin-bottom: 16px;
  }
`;

export const ButtonRow = styled(Row)`
  .button {
    max-width: 200px;
    border-radius: 8px;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }

  @media ${BREAKPOINTS.sm} {
    margin-right: 0px;

    .button:not(:last-child) {
      margin-right: 8px;
      margin-bottom: 8px;
    }
  }
`;
export const BoxItemContainer = styled.div`
  margin-bottom: 8px;
`;

export const StyledTextField = styled(TextField)``;
