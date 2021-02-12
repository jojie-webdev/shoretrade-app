import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .btn-add-address {
    margin-top: 32px;
  }
`;

export const AddressBadge = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  padding: 4px 8px;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 8px;
`;

export const InteractionCol = styled(Col)`
  &:not(:last-child) {
    margin-bottom: 12px;
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
