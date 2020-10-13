import Alert from 'components/base/Alert';
import { Row, Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Wrapper = styled.div``;

export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-col {
    margin-bottom: 16px;
  }
`;

export const SmallAlertContainer = styled.div`
  padding: ${({ theme }) =>
    theme.appType === 'seller' ? '8px 0px 8px 10px' : '16px 0px 16px 18px'};
  width: 100%;
  background: ${({ theme }) =>
    theme.appType === 'seller'
      ? 'rgba(255, 207, 92, 0.12)'
      : theme.brand.alert};
  border-radius: 4px;
  margin-bottom: 24px;

  display: flex;
  align-items: flex-start;

  .icon-container {
    margin-right: 10px;
    // margin-top: 0px;
    line-height: 0.875 !important;
  }

  .text {
    // margin-top: 8px;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
`;
