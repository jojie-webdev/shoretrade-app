import Interaction from 'components/base/Interactions';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  .emptystate-row {
    height: 100%;
  }

  .controls-row {
    width: 100%;
    margin-bottom: 32px;
  }
`;

export const PriorityNumber = styled.div`
  background: ${(props) => props.theme.brand.primary};
  border-radius: 2px;
  width: 34px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 12px;

  .content {
    display: flex;
    align-items: center;

    .center-text {
      margin: 0 4px;
    }
  }
`;

export const DeliveryRow = styled(Row)`
  margin-bottom: 32px;

  .title {
    margin-bottom: 8px;
  }
`;
