import Interaction from 'components/base/Interactions';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  .emptystate-row {
    height: 100%;
  }

  .controls-row {
    width: 100%;
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
  .content {
    display: flex;
    align-items: center;

    .center-text {
      margin: 0 4px;
    }
  }
`;
