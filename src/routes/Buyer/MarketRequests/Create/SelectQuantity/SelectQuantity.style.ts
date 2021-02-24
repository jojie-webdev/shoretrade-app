import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const QuantityFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  min-width: 280px;

  .submit-btn {
    margin-top: 1rem;
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
`;
