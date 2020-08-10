import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div`
  .address-row {
    margin-bottom: 24px;
  }
`;

export const AddressTextContainer = styled.div`
  .label {
    margin-bottom: 8px;
  }
`;

export const InteractionCol = styled(Col)`
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const SmallAlertContainer = styled.div`
  padding: 8px;
  width: 100%;
  background: rgba(255, 207, 92, 0.12);
  border-radius: 4px;
  margin-bottom: 16px;

  display: flex;
  align-items: center;

  .icon-container {
    margin-right: 8px;
  }
`;
