import TextField from 'components/base/TextField';
import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const QuantityFormContainer = styled(ContainerWithCategoryImageContent)`
  height: 240px;

  .submit-btn {
    margin-top: 1rem;
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
`;
