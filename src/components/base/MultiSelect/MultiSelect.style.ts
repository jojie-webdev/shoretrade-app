import styled from 'utils/styled';

import Typography from '../Typography';

export const Container = styled.div`
  width: 100%;

  .icon_down_dir:before {
    content: unset;
  }

  .highlightOption,
  .highlightOption:hover,
  .option:hover {
    background: ${({ theme }) => theme.brand.primary};
  }

  .notFound {
    font-family: 'Basis Grotesque Pro', sans-serif;
    font-size: 0.875rem;
  }
`;

export const Label = styled(Typography)`
  margin-bottom: 4px;
`;
