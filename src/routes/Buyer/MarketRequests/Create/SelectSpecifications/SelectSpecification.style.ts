import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const SpecificationFormContainer = styled(
  ContainerWithCategoryImageContent
)`
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
