import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .alert-container {
    margin-bottom: 16px;
  }
`;

export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-col {
    margin-bottom: 16px;
  }
`;
