import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const RoleContainer = styled.div`
  display: flex;
  align-items: flex-start;

  :not(:last-child) {
    margin-bottom: 24px;
  }

  .text-container {
    margin-left: 8px;

    .overline {
      margin-bottom: 6px;
    }
  }

  .radio-container {
    margin-top: -8px;
  }
`;

export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-container {
    margin-bottom: 24px;
  }
`;

export const RolesRow = styled(Row)`
  margin-bottom: 24px;

  .title {
    margin-bottom: 16px;
  }
`;
