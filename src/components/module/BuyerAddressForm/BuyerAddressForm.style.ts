import Alert from 'components/base/Alert';
import Checkbox from 'components/base/Checkbox';
import styled from 'utils/styled';

export const Container = styled.div`
  .checkbox-col {
    display: flex;
  }

  .textfield-row,
  .checkbox-row {
    margin-bottom: 24px;
  }

  .checkbox-container {
    margin-right: 8px;
  }

  .checkbox-col {
    padding-left: 0px !important;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
