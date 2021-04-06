import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const SummaryContentContainer = styled(
  ContainerWithCategoryImageContent
)`
  max-width: 320px;

  .submit-btn {
    margin-top: 1rem;
  }

  .size-container {
    margin-bottom: 1rem;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;

    .text-field {
      margin-bottom: 1rem;
    }
  }

  .text-field {
    margin-bottom: 1rem;
  }
`;

export const StyledTextField = styled(TextField)``;

export const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;

  .offers-state-badge {
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;
