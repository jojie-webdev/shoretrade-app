import styled from 'utils/styled';

import { ContainerWithCategoryImageContent } from '../Create.style';

export const SizeFormContainer = styled(ContainerWithCategoryImageContent)`
  max-width: 300px;
  .submit-btn {
    margin-top: 1rem;
  }
`;

export const MetricLabelContainer = styled.div`
  display: flex;
  flex-direction: row;

  .metric-value {
    margin-left: 2px;
  }
`;

export const SelectRowContainer = styled.div`
  > div {
    margin-top: 1rem;
  }

  > div :first-child {
    margin-top: 0;
  }
`;
