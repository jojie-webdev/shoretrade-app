import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const HeaderRow = styled(Row)`
  margin-bottom: 24px;

  .header-col {
    display: flex;
    align-items: center;

    .icon-container {
      margin-right: 8px;
    }
  }
`;

export const TitleRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
