import Button from 'components/base/Button';
import Select from 'components/base/Select';
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
    margin-bottom: 24px;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

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
  margin-bottom: 24px;

  .offers-state-badge {
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;

export const SubmitButton = styled(Button)`
  border-radius: 12px;
  max-width: 237px;
`;

export const CheckboxMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledAddressSelect = styled(Select)`
  height: auto;

  .dropdownSelectContainer {
    height: auto;
  }
`;
