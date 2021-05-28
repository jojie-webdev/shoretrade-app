import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) =>
      props.isIOS ? `calc(${IOSBOTTOMPADDING} + 125px)` : '125px'};
  }

  .breadcrumb-container {
    margin-bottom: 26px;
  }
`;

export const RoleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 8px;

  :not(:last-child) {
    margin-bottom: 12px;
  }

  .text-container {
    margin-left: 12px;

    .overline {
      margin-bottom: 2px;
    }
  }
`;

export const TextFieldRow = styled(Row)`
  margin-bottom: 8px;

  .textfield-container {
    margin-bottom: 24px;
  }
`;

export const RolesRow = styled(Row)`
  margin-bottom: 32px;

  .title {
    margin-bottom: 12px;
  }
`;
