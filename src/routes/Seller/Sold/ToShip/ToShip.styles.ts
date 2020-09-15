import Interaction from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const PendingRow = styled.div`
  margin-bottom: 32px;

  .title-col {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .svg-container {
      margin-right: 8px;
    }
  }

  .pagination-container {
    display: flex;
    justify-content: center;
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

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
  transition: all 0.1s ease;
`;

export const DeliveryRow = styled(Row)`
  margin-bottom: 32px;

  .title {
    margin-bottom: 8px;
  }
`;
