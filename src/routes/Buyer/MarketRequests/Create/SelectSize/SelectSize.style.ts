import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const SizeFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;

  .submit-btn {
    margin-top: 1rem;
  }

  div {
    margin-bottom: 1rem;
  }
`;
