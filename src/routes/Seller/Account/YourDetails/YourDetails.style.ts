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

  .txtfld__business_number
    > .text_field__field_container
    > .text_field__field_container__input {
    cursor: ${({ theme }) => (theme.isSFM ? 'pointer' : 'auto')};
  }
`;

export const InputRow = styled(Row)`
  margin-bottom: 8px;

  .input-col {
    margin-bottom: 24px;
  }
`;
