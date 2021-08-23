import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const SpecificationFormContainer = styled(
  ContainerWithCategoryImageContent
)`
  .spec-row {
    min-width: 180px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 2rem;

    div {
      margin-right: 4rem;
      margin-bottom: 1rem;
      width: 120px;
      display: flex;
      align-items: flex-start;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProceedButton = styled(Button)`
  border-radius: 12px;
  max-width: 124px;
  margin-left: 8px;
`;

export const PreviousButton = styled(Button)`
  border-radius: 12px;
  max-width: 64px;
`;

export const AnchorContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-content: center;
`;

export const CheckboxContainer = styled.div`
  @media ${BREAKPOINTS['sm']} {
    margin-top: 10px;
  }
`;

export const CheckboxGroupContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const SpecsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledTitle = styled(Typography)`
  font-family: 'Media Sans';
  margin-bottom: 12;
`;
