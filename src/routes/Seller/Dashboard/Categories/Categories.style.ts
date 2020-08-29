import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div``;

export const HeaderRow = styled(Row)`
  margin-bottom: 32px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CategoryContainer = styled.div<{ progress: number }>`
  padding: 16px 24px;
  background: ${(props) => props.theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .text-container {
      .overline {
        margin-bottom: 4px;
      }

      .price-container {
        display: flex;
        align-items: center;

        .svg-container {
          margin: 0 4px 0 8px;
        }
      }
    }
  }

  .bottom {
    position: relative;
    height: 2px;
    width: 100%;
    background: ${(props) => props.theme.grey.shade8};
    border-radius: 1px;

    .progress-bar {
      height: 2px;
      width: ${(props) => `${props.progress}%`};
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 1px;

      background: ${(props) => props.theme.brand.primary};
    }
  }

  .image {
    height: 40px;
  }
`;
