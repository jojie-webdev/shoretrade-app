import Alert from 'components/base/Alert';
import Checkbox from 'components/base/Checkbox';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;

  .breadcrumb-container {
    margin-bottom: 26px;
  }

  .textfield-row,
  .checkbox-row {
    margin-bottom: 24px;
  }

  .textfield-col {
    margin-top: 24px;
  }

  .checkbox-container {
    margin-right: 8px;
  }

  .checkbox-col {
    display: flex;
    padding-left: 0px !important;
  }

  .delete-btn {
    margin-left: 8px;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
