import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const InputRow = styled(Row)`
  margin-bottom: 8px;

  .input-col {
    margin-bottom: 24px;
  }
`;
