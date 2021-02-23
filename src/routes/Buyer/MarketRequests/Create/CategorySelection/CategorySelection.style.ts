import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const CategoryInteractionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`;

export const CategoryInterAction = styled(Interactions)`
  margin-bottom: 12px;
`;
