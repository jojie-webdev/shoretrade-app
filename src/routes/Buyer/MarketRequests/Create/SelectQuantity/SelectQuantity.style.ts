import TextField from 'components/base/TextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const QuantityFormContainer = styled(ContainerWithCategoryImageContent)`
  height: 240px;

  .submit-btn {
    margin-top: 1rem;
  }

  @media ${BREAKPOINTS['sm']} {
    height: auto;
  }

  .quantity-to {
    margin-top: 32px;
  }
`;

export const StyledTextField = styled(TextField)`
  flex: 1;

  @media ${BREAKPOINTS['sm']} {
    height: 0px;
  }
`;
