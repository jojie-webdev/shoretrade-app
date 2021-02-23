import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const SpecificationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;

  .spec-row {
    min-width: 180px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    div {
      margin-right: 4rem;
      margin-bottom: 1rem;
    }
  }
`;
