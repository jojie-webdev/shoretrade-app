import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) =>
      props.isIOS ? `calc(${IOSBOTTOMPADDING} + 125px)` : '125px'};
  }

  .breadcrumb-container {
    margin-bottom: 26px;
  }

  .textfield-row,
  .checkbox-row {
    margin-bottom: 24px;
  }

  .textfield-col {
    margin-top: 24px;
  }

  .checkbox-container {
    margin-right: 8px;
  }

  .checkbox-col {
    display: flex;
    padding-left: 0px !important;
  }

  .delete-btn {
    margin-left: 8px;
  }
`;
