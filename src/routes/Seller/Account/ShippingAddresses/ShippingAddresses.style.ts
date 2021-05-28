import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) =>
      props.isIOS ? `calc(${IOSBOTTOMPADDING} + 125px)` : '125px'};
  }

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
