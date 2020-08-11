import Checkbox from 'components/base/Checkbox';
import styled from 'utils/styled';

export const Container = styled.div`
  .checkbox-col {
    display: flex;
    /* align-items: center; */
  }

  .textfield-row,
  .checkbox-row {
    margin-bottom: 24px;
  }

  .checkbox-container {
    margin-right: 8px;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-right: 8px;
`;
