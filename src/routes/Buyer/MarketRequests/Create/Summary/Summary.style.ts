import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const SummaryContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;

  .submit-btn {
    margin-top: 1rem;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;

    .text-field {
      margin-bottom: 1rem;
    }
  }
`;

export const StyledTextField = styled(TextField)``;

export const BadgesContainer = styled.div`
  display: flex;
  margin-bottom: 30px;

  .offers-state-badge {
    margin-right: 0.6rem;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;
