import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const HeaderRow = styled(Row)`
  margin-bottom: 32px;

  .padding-bread {
    padding-left: 16px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-left: 8px;

    .text {
      margin-right: 16px;
    }
    .text-long {
      margin-right: 16px;
      margin-top: 12px;
      margin-left: 16px;
    }
  }
`;
