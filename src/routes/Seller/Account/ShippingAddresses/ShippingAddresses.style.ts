import Alert from 'components/base/Alert';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';
export const Wrapper = styled.div`
  .address-row {
    margin-top: 24px;
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

export const Notification = styled(Alert)`
  margin-bottom: 16px;
`;
