import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const HeaderRow = styled(Row)`
  margin-bottom: 32px;
`;

export const CategoryContainer = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.grey.shade9};
  margin-bottom: 16px;

  img {
    height: 64px;
    width: 64px;
    border: 1px solid red;
    border-radius: 4px;
    margin-right: 16px;
  }

  .text-container {
    .overline {
      margin-bottom: 4px;
    }

    .price-container {
      display: flex;
      align-items: center;

      .svg-container {
        margin: 0 4px 0 14px;
      }
    }
  }
`;
